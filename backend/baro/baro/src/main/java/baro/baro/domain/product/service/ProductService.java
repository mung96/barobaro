package baro.baro.domain.product.service;

import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.request.ProductModifyReq;
import baro.baro.domain.product.dto.request.RecentlyProductsReq;
import baro.baro.domain.product.dto.request.SearchProductsReq;
import baro.baro.domain.product.dto.response.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductDetails addProduct(ProductAddReq productAddReq, List<MultipartFile> files, Long memberId) throws IOException;
    ProductDetails findProduct(Long id, Long memberId);
    MyProductListRes findRentalProducts(Long memberId);
    RecentlyViewListRes recentlyViewedProducts(Long memberId);
    RecentlyUploadedListRes recentlyUpdatedProducts(Long memberId);
    MyProductListRes findOwnerProducts(Long memberId);
    ProductDetails modifyProduct(ProductModifyReq productModifyReq, List<MultipartFile> files, Long productId, Long memberId) throws IOException;
    SearchProductRes searchProduct(SearchProductsReq searchProductsReq, Long memberId);
    SearchProductRes searchRecentlyProducts(RecentlyProductsReq recentlyProductsReq, Long memberId);
    KeywordListRes searchKeyword(String keyword);
}
