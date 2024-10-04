package baro.baro.global.s3;

import baro.baro.global.exception.CustomException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import static baro.baro.global.formatter.DateFormatter.convertToDateFormat;
import static baro.baro.global.statuscode.ErrorCode.FILE_EXTENSION_FAIL;

@Service
public class PdfS3Service extends S3Service {
    public PdfS3Service(final AmazonS3Client amazonS3Client) {
        super(amazonS3Client);
    }

    public String upload(byte[] pdfBytes) throws IOException {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(pdfBytes.length);
        objectMetadata.setContentType("application/pdf");
        UUID uuid = UUID.randomUUID();
        String s3FileName = "contract/" + uuid.toString() + "_" + convertToDateFormat() + ".pdf";
        return uploadFile(pdfBytes, s3FileName, "application/pdf");
    }

    public InputStream download(String fileName) throws IOException {
        return downloadFile(fileName);
    }

    private void validatePdfExtension(String extension) {
        if (!extension.equals("pdf")) {
            throw new CustomException(FILE_EXTENSION_FAIL);
        }
    }
}
