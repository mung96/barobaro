package baro.baro.domain.product.service;

import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.request.ProductAddReq;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductDetails addProduct(ProductAddReq productAddReq, List<MultipartFile> files, Long memberId) throws IOException;
}
