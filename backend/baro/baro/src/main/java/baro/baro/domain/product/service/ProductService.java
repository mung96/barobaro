package baro.baro.domain.product.service;

import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.ProductDto;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.response.MyProductListRes;
import baro.baro.domain.product.dto.response.RecentlyUploadedListRes;
import baro.baro.domain.product.dto.response.RecentlyViewListRes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductDetails addProduct(ProductAddReq productAddReq, List<MultipartFile> files, Long memberId) throws IOException;
    ProductDetails findProduct(Long id, Long memberId);
    MyProductListRes findRentalProducts(Long memberId);
    RecentlyViewListRes recentlyViewedProducts(Long memberId);
    RecentlyUploadedListRes recentlyUpdatedProducts(Long memberId);
}
