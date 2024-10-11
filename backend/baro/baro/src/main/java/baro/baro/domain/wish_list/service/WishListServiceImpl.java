package baro.baro.domain.wish_list.service;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.product.dto.SearchProductDto;
import baro.baro.domain.product.dto.SearchProductTmpDto;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.repository.ProductRepository;
import baro.baro.domain.wish_list.dto.WishDto;
import baro.baro.domain.wish_list.dto.response.MyWishListRes;
import baro.baro.domain.wish_list.entity.WishList;
import baro.baro.domain.wish_list.repository.WishListRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static baro.baro.global.statuscode.ErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {
    private final static int PRODUCT_SIZE = 20;

    private final WishListRepository wishListRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public WishDto wishList(Long productId, Long memberId, Boolean isWished) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(PRODUCT_NOT_FOUND));

        boolean wish = wishListRepository.existsByMemberIdAndProductId(member.getId(), product.getId());

        if(isWished) {
            if(wish) {
                throw new CustomException(WISHLIST_IS_PRESENT);
            }
            WishList wishList = WishDto.toEntity(member, product);

            wishListRepository.save(wishList);
        } else {
            if(!wish) {
                throw new CustomException(WISHLIST_IS_NOT_PRESENT);
            }

            wishListRepository.deleteByMemberIdAndProductId(member.getId(), product.getId());
        }

        Integer count = wishListRepository.countWishList(product.getId());
        product.updateWishCount(count);

        return WishDto.toDto(isWished, count);
    }

    @Override
    public MyWishListRes getWishList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Pageable pageable = PageRequest.of(0, PRODUCT_SIZE);

        List<SearchProductTmpDto> tmpProducts = productRepository.findMyWishListProducts(member.getId(), pageable);

        List<SearchProductDto> result = tmpProducts.stream()
                .map(SearchProductDto::toDto)
                .toList();

        return new MyWishListRes(result);
    }
}
