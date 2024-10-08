package baro.baro.domain.product.controller;

import baro.baro.domain.product.dto.KeywordDto;
import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.request.ProductModifyReq;
import baro.baro.domain.product.dto.request.RecentlyProductsReq;
import baro.baro.domain.product.dto.request.SearchProductsReq;
import baro.baro.domain.product.dto.response.*;
import baro.baro.domain.product.service.ProductService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final JwtService jwtService;
    private final ProductService productService;

    @PostMapping("/products")
    public ResponseEntity<?> productAdd(@RequestPart(value = "dto") ProductAddReq productAddReq,
                                        @RequestPart(value = "files") List<MultipartFile> files) throws IOException {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ProductDetails result = productService.addProduct(productAddReq, files, memberId);

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_CREATED, result), CREATED);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> productDetails(@PathVariable Long productId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ProductDetails result = productService.findProduct(productId, memberId);

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_DETAILS_OK, result), OK);
    }

    @GetMapping("/products/recently-viewed")
    public ResponseEntity<?> recentlyViewedList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        RecentlyViewListRes result = productService.recentlyViewedProducts(memberId);

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_RECENTLY_VIEWED_LIST_OK, result), OK);
    }

    @GetMapping("/products/recently-uploaded")
    public ResponseEntity<?> recentlyUploadedList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        RecentlyUploadedListRes result = productService.recentlyUpdatedProducts(memberId);

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_RECENTLY_UPLOADED_LIST_OK, result), OK);
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<?> productModify(@PathVariable Long productId,
                                           @RequestPart(value = "dto") ProductModifyReq productModifyReq,
                                           @RequestPart(value = "files") List<MultipartFile> files) throws IOException {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ProductDetails result = productService.modifyProduct(productModifyReq, files, productId, memberId);

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_MODIFIED, result), OK);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> productRemove(@PathVariable Long productId) {
        return new ResponseEntity<>(ResponseDto.success(PRODUCT_DELETED, null), NO_CONTENT);
    }

    @GetMapping("/members/me/rental")
    public ResponseEntity<?> rentalProductList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        MyProductListRes result = productService.findRentalProducts(memberId);

        return new ResponseEntity<>(ResponseDto.success(RENTAL_PRODUCT_LIST_OK, result), OK);
    }

    @GetMapping("/members/me/owner")
    public ResponseEntity<?> ownerProductList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        MyProductListRes result = productService.findOwnerProducts(memberId);

        return new ResponseEntity<>(ResponseDto.success(OWNER_PRODUCT_LIST_OK, result), OK);
    }

    @GetMapping("/search/products")
    public ResponseEntity<?> searchProducts(@ModelAttribute SearchProductsReq searchProductsReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        SearchProductRes result = productService.searchProduct(searchProductsReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(SEARCH_PRODUCT_OK, result), OK);
    }

    @GetMapping("/products/recently")
    public ResponseEntity<?> recentlyProducts(@ModelAttribute RecentlyProductsReq recentlyProductsReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        SearchProductRes result = productService.searchRecentlyProducts(recentlyProductsReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(SEARCH_PRODUCT_OK, result), OK);
    }

    @GetMapping("/search/suggestions")
    public ResponseEntity<?> keywordList(@RequestParam("keyword") String keyword) {
        List<KeywordDto> keywords = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            KeywordDto keywordDto = KeywordDto.builder()
                    .name("추천검색어"+i)
                    .build();

            keywords.add(keywordDto);
        }

        KeywordListRes result = new KeywordListRes(keywords);

        return new ResponseEntity<>(ResponseDto.success(SUGGEST_KEYWORD_LIST_OK, result), OK);
    }
}
