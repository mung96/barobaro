package baro.baro.global.s3;

import baro.baro.global.exception.CustomException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static baro.baro.global.formatter.DateFormatter.convertToDateFormat;
import static baro.baro.global.statuscode.ErrorCode.*;
import static baro.baro.global.statuscode.ErrorCode.FILE_DELETE_FAIL;

@Slf4j
@Service
public class Images3Service extends S3Service {
    public Images3Service(AmazonS3Client amazonS3Client) {
        super(amazonS3Client);
    }

    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        if (multipartFile.isEmpty() || Objects.isNull(multipartFile.getOriginalFilename())) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        validateImageFileExtension(extension);

        String s3FileName = dirName + "/upload_" + convertToDateFormat() + "." + extension;
        byte[] content = multipartFile.getBytes();

        return uploadFile(content, s3FileName, "image/" + extension);
    }

    // 다중 파일 업로드 메서드
    public List<String> uploadMultipleFiles(List<MultipartFile> multipartFiles, String dirName) throws IOException {
        if (multipartFiles == null || multipartFiles.isEmpty()) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        }

        // 결과 URL 리스트
        List<String> uploadedUrls = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            String uploadedUrl = upload(multipartFile, dirName);
            uploadedUrls.add(uploadedUrl);
        }

        return uploadedUrls; // 업로드된 파일들의 S3 URL 리스트 반환
    }

    private void validateImageFileExtension(String extension) {
        if (!Arrays.asList("jpg", "jpeg", "png", "webp").contains(extension)) {
            throw new CustomException(FILE_EXTENSION_FAIL);
        }
    }

    public void deleteFolder(String folderPath) throws CustomException {
        try {
            ListObjectsV2Request listObjectsRequest = new ListObjectsV2Request().withBucketName(bucket).withPrefix(folderPath);
            ListObjectsV2Result result;

            do {
                result = amazonS3Client.listObjectsV2(listObjectsRequest);
                List<S3ObjectSummary> objects = result.getObjectSummaries();

                for (S3ObjectSummary objectSummary : objects) {
                    amazonS3Client.deleteObject(bucket, objectSummary.getKey());
                }

                listObjectsRequest.setContinuationToken(result.getNextContinuationToken());
            } while (result.isTruncated());

        } catch (AmazonServiceException e) {
            log.info(e.getErrorMessage());
            throw new CustomException(FILE_DELETE_FAIL);
        } catch (Exception exception) {
            throw new CustomException(FILE_DELETE_FAIL);
        }
    }

    public void deleteFile(String fileUrl) throws CustomException {
        try {
            try {
                String fileKey = fileUrl.replace(bucketUrl, "");
                amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileKey));
            } catch (AmazonServiceException e) {
                throw new CustomException(FILE_DELETE_FAIL);
            }
        } catch (Exception exception) {
            throw new CustomException(FILE_DELETE_FAIL);
        }
    }
}

