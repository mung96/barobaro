package baro.baro.global.s3;

import baro.baro.global.exception.CustomException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;

import static baro.baro.global.statuscode.ErrorCode.FILE_UPLOAD_FAIL;

@Slf4j
@RequiredArgsConstructor
public abstract class S3Service {
    protected final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    protected String bucket;

    @Value("${BUCKET_URL}")
    protected String bucketUrl;

    protected String uploadFile(byte[] content, String s3FileName, String contentType) throws IOException {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(contentType);
        objectMetadata.setContentLength(content.length);
        objectMetadata.setCacheControl("no-cache");

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(content);

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, s3FileName, byteArrayInputStream, objectMetadata);
            amazonS3Client.putObject(putObjectRequest);
        } catch (Exception e) {
            log.error("S3 파일 업로드 실패: {}", e.getMessage());
            throw new CustomException(FILE_UPLOAD_FAIL);
        } finally {
            try {
                byteArrayInputStream.close();
            } catch (IOException e) {
                log.error(e.getMessage());
            }
        }

        return generateS3(s3FileName);
    }

    protected InputStream downloadFile(String fileName) {
        return amazonS3Client.getObject(bucket, fileName).getObjectContent();
    }

    protected Date getlastModified(String fullUrl){
        String fileName = fullUrl.substring(fullUrl.indexOf("contract/"));
        ObjectMetadata objectMetadata = amazonS3Client.getObjectMetadata(bucket, fileName);
        return objectMetadata.getLastModified();
    }

    protected String generateS3(String s3FileName) {
        if (!bucketUrl.endsWith("/")) {
            bucketUrl += "/";
        }
        return bucketUrl + s3FileName;
    }
}
