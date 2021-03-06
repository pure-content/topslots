import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import ReputationEstimate from '../../functions/ReputationEstimate'
import TopTenSideBar from '../../components/TopTenSideBar'
import DateHandler from '../../functions/DateHandler'
import ExpandableText from '../../components/dropdown/ExpandableText'
import PaymentMethodsAccordion from '../../components/dropdown/PaymentMethodsAccordion'
import GameProvidersAccordion from '../../components/dropdown/GameProvidersAccordion'
import ComplainFormSection from '../../components/ComplainFormSection'
import DropdownWrap from '../../components/dropdown/DropdownWrap'
import Parser from 'html-react-parser'
import Helmet from "react-helmet"

import UKFLAG from '../../data/uk-flag'
import tabDecorLeft from '../../assets/images/tab-section-left.png';
import tabDecorRight from '../../assets/images/tab-section-right.png';
import paymentDecorLeft from '../../assets/images/payment-method-decor-left.png';
import paymentDecorRight from '../../assets/images/payment-method-decor-right.png';

export const query = graphql`
query($id: ID!) {
    wpgraphql {
        review(id: $id) {

            uri
            title
            content
            seo {
                metaDesc
                title
                opengraphType
            }
            featuredImage {
                node {
                    mediaItemUrl
                    mediaDetails {
                        filteredSizes(sizes: "review-single") {
                            width
                            height
                            sourceUrl
                        }
                    }
                }
            }
            date
            lastEditedBy {
                node {
                    name
                }
            }

            cpt_reviews {
                affiliateLink
                availableGames {
                    uri
                    name
                    tax_games_categories {
                        termIcon {
                            mediaItemUrl
                        }
                    }
                }
                bonusText
                bonusSubtext
                colorForBackground
                cons {
                    text
                }
                currency {
                    name
                    uri
                    slug
                }
                customerSupportLanguage {
                    name
                    uri
                    slug
                }
                depositBonusText
                forPlayersFrom {
                    name
                    uri
                    slug
                }
                gameProvider {
                    ... on WPGraphQL_Game_provider {
                        id
                        uri
                        title
                        slug
                        featuredImage {
                            node {
                                mediaItemUrl
                            }
                        }
                    }
                }
                hasExclusiveBonus
                interestingFacts {
                    text
                }
                languageOptions {
                    optionDescription
                    language {
                        name
                        tax_review_languages {
                            languageIcon {
                                mediaItemUrl
                            }
                        }
                    }
                }
                licensingAuthority {
                    uri
                    slug
                    name
                }
                liveChatLanguage {
                    uri
                    slug
                    name
                }
                paymentMethods {
                    ... on WPGraphQL_Payment_method {
                        id
                        uri
                        title
                        slug
                        featuredImage {
                            node {
                                mediaItemUrl
                            }
                        }
                        cpt_payment_methods {
                            depositLimits
                            withdrawalLimits
                            withdrawalTime
                        }
                    }
                }
                popularFilters {
                    uri
                    slug
                    name
                }
                pros {
                    text
                }
                rating
                termsAndConditionsText
                websiteLanguage {
                    slug
                    name
                    uri
                }
                withdrawalLimit

                noDepositBonus {
                    fieldGroupName
                    hasThisBonus
                    showInListing
                    tCApply
                    bonusAffiliateLink
                    promocode
                    name
                    presentText
                    exclusiveText
                    detailsFinalComment
                    detailsDropdowns {
                        detailImage {
                            mediaItemUrl
                        }
                        detailDropdownHead
                        detailDropdownBody
                    }
                }
                freeSpinsBonus {
                    fieldGroupName
                    hasThisBonus
                    showInListing
                    tCApply
                    bonusAffiliateLink
                    promocode
                    name
                    presentText
                    exclusiveText
                    detailsFinalComment
                    detailsDropdowns {
                        detailImage {
                            mediaItemUrl
                        }
                        detailDropdownHead
                        detailDropdownBody
                    }
                }
                depositBonus {
                    fieldGroupName
                    hasThisBonus
                    showInListing
                    tCApply
                    bonusAffiliateLink
                    promocode
                    name
                    presentText
                    exclusiveText
                    detailsFinalComment
                    detailsDropdowns {
                        detailImage {
                            mediaItemUrl
                        }
                        detailDropdownHead
                        detailDropdownBody
                    }
                }
                bestPercentageBonus {
                    fieldGroupName
                    hasThisBonus
                    showInListing
                    tCApply
                    bonusAffiliateLink
                    promocode
                    name
                    presentText
                    exclusiveText
                    detailsFinalComment
                    detailsDropdowns {
                        detailImage {
                            mediaItemUrl
                        }
                        detailDropdownHead
                        detailDropdownBody
                    }
                }
                otherBonus {
                    fieldGroupName
                    hasThisBonus
                    showInListing
                    tCApply
                    bonusAffiliateLink
                    promocode
                    name
                    presentText
                    exclusiveText
                    detailsFinalComment
                    detailsDropdowns {
                        detailImage {
                            mediaItemUrl
                        }
                        detailDropdownHead
                        detailDropdownBody
                    }
                }

                residentsFrom {
                    name
                    tax_review_countries {
                        countryImage {
                            mediaItemUrl
                        }
                    }
                }
                ipAddressFrom {
                    name
                }
                vpnUsage

                owner
                established
                withdrawalLimit
                licensingAuthority {
                    name
                }
                relatedCasinos {
                    ... on WPGraphQL_Review {
                        title
                        uri
                        featuredImage {
                            node {
                                mediaDetails {
                                    filteredSizes(sizes: "review-super-extra-small") {
                                        sourceUrl
                                    }
                                }
                            }
                        }
                        cpt_reviews {
                            rating
                        }
                    }
                }
            }
        }
    }
}
`

export default function ReviewSingle({ data }) {

    const { review } = data.wpgraphql
    
    const bonusesForList = []
    const allBonuses = [ 
        review.cpt_reviews.noDepositBonus,
        review.cpt_reviews.freeSpinsBonus,
        review.cpt_reviews.depositBonus,
        review.cpt_reviews.bestPercentageBonus,
        review.cpt_reviews.otherBonus
    ];
    allBonuses.forEach((bonus) => {
        if(bonus.showInListing){
            bonusesForList.push(bonus)
        }
    })

    const MainSection = () => {
        
        const sectionCssClass = 'main-section'

        return(
            <div className={`${sectionCssClass} wrapper`}>
                <div className={`${sectionCssClass}__left`}>

                    <div className="top-info-wrap">
                        <div className="top-info">
                            { review.featuredImage && <img className="top-info__img" src={review.featuredImage.node.mediaDetails.filteredSizes[0].sourceUrl} alt=""/> }

                            <div className="top-info__info-box">
                                
                                <div className="rating-span">
                                    { review.title ? <h1>{review.title} Review</h1> : '' }

                                    <div className="rating-span__top">
                                        <UKFLAG />
                                        <svg className="check-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.77395 14.5895L0.248949 9.06454C-0.0829829 8.73261 -0.0829829 8.19442 0.248949 7.86246L1.451 6.66037C1.78293 6.32841 2.32116 6.32841 2.65309 6.66037L6.37499 10.3822L14.3469 2.41037C14.6788 2.07844 15.2171 2.07844 15.549 2.41037L16.751 3.61246C17.083 3.94439 17.083 4.48258 16.751 4.81454L6.97604 14.5896C6.64407 14.9215 6.10588 14.9215 5.77395 14.5895Z" fill="#5FCC6A"/>
                                        </svg>
                                        <span className="rating-span__country-specific">Rating for players from Ukraine: 9.9</span>
                                    </div>
                                    
                                </div>
                                { review.cpt_reviews.affiliateLink ? <a href={review.cpt_reviews.affiliateLink} className="btn">Visit Casino</a> : null }
                            </div>
                            <div className="top-info__reputation-box">
                                <ReputationEstimate rating={review.cpt_reviews.rating} className='reputation-box' />

                                <div className="award-box">
                                    <span>{review.cpt_reviews.rating}</span>
                                    <svg width="98" height="143" viewBox="0 0 98 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M61.1181 101.371C60.5377 102.725 58.9677 103.351 57.6138 102.77C57.2767 102.625 56.9723 102.412 56.7213 102.144L49.4018 94.3456L42.0833 102.144C41.0752 103.219 39.3864 103.272 38.3117 102.263C38.0444 102.012 37.8306 101.708 37.6866 101.371L33.4622 91.5439L28.0563 94.2682V142.997L47.4194 121.483C48.4712 120.389 50.2113 120.353 51.3056 121.405C51.3329 121.43 51.359 121.457 51.3852 121.483L70.7484 143V94.2736L65.3392 91.5439L61.1181 101.371Z" fill="#C2A57B"/>
                                        <path d="M76.0845 48.5584C76.0845 63.2946 64.138 75.2411 49.4018 75.2411C34.6667 75.2411 22.7203 63.2946 22.7203 48.5584C22.7203 33.8222 34.6667 21.8768 49.4018 21.8768C64.138 21.8768 76.0845 33.8222 76.0845 48.5584Z" fill="#C2A57B"/>
                                        <path d="M85.7726 66.5076L94.9807 64.3463L89.3129 56.7791C88.4314 55.5986 88.6736 53.9272 89.854 53.0446C89.8977 53.0119 89.9424 52.9802 89.9882 52.9508L97.9024 47.7609L89.9882 42.571C88.7565 41.7636 88.4117 40.1097 89.2191 38.8768C89.2496 38.831 89.2813 38.7863 89.314 38.7426L94.9785 31.1754L85.7759 29.0163C84.3412 28.6803 83.451 27.2446 83.7881 25.8099C83.8001 25.7553 83.8143 25.7019 83.8306 25.6495L86.5549 16.5909L77.1602 17.7092C75.6972 17.8837 74.3694 16.8386 74.1949 15.3755C74.1872 15.3188 74.1829 15.2632 74.1796 15.2064L73.6461 5.76051L65.2116 10.0111C63.8947 10.6733 62.2909 10.1431 61.6287 8.82732C61.6036 8.77823 61.5807 8.72804 61.5589 8.67677L57.8233 1.52588e-05L51.3471 6.89188C50.339 7.96652 48.6501 8.01998 47.5755 7.0108C47.5351 6.97262 47.4958 6.93334 47.4577 6.89188L40.9815 1.52588e-05L37.2459 8.69095C36.6665 10.0449 35.0988 10.6733 33.7437 10.094C33.6925 10.0722 33.6423 10.0492 33.5932 10.0242L25.151 5.75506L24.6175 15.1977C24.576 15.9341 24.2324 16.6193 23.6672 17.0928C23.1065 17.5706 22.3689 17.7921 21.6369 17.7005L12.2422 16.5833L14.9828 25.6419C15.4072 27.0525 14.6075 28.5407 13.1969 28.9651C13.1434 28.9814 13.0889 28.9956 13.0343 29.0087L3.82952 31.1667L9.49401 38.7339C10.3766 39.9144 10.1355 41.5869 8.95615 42.4695C8.91142 42.5022 8.86777 42.5328 8.82195 42.5633L0.902359 47.7609L8.8165 52.9551C10.0482 53.7647 10.3919 55.4186 9.58238 56.6504C9.55293 56.6962 9.52129 56.7409 9.48856 56.7846L3.82407 64.3518L13.03 66.5098C14.4635 66.8469 15.3538 68.2837 15.0167 69.7184C15.0036 69.7708 14.9905 69.8231 14.9741 69.8744L12.2499 78.9472L21.6445 77.8289C23.1086 77.6544 24.4364 78.6985 24.611 80.1626C24.6175 80.2182 24.6219 80.275 24.6251 80.3317L25.1586 89.7776L33.6041 85.5074C33.9761 85.3198 34.3874 85.2205 34.8042 85.2194C35.1162 85.2194 35.425 85.2739 35.7174 85.383C36.4091 85.634 36.9666 86.1609 37.2568 86.8373L40.9924 95.525L47.4675 88.6244C48.4767 87.5498 50.1655 87.4974 51.2391 88.5055C51.2805 88.5437 51.3198 88.584 51.358 88.6244L57.8233 95.5217L61.5589 86.8341C62.1382 85.479 63.706 84.8506 65.061 85.4299C65.1123 85.4518 65.1625 85.4758 65.2116 85.4998L73.6559 89.7689L74.1894 80.3241C74.2723 78.8523 75.5314 77.7264 77.0031 77.8093C77.0588 77.8126 77.1144 77.8169 77.17 77.8235L86.5647 78.9417L83.8404 69.8701C83.4171 68.4583 84.2168 66.9702 85.6286 66.5469C85.681 66.5316 85.7322 66.5174 85.7857 66.5054L85.7726 66.5076ZM49.4018 80.5793C31.7188 80.5793 17.3841 66.2447 17.3841 48.5617C17.3841 30.8776 31.7188 16.5429 49.4018 16.5429C67.0859 16.5429 81.4206 30.8776 81.4206 48.5617C81.402 66.237 67.0783 80.5608 49.4018 80.5793Z" fill="#C2A57B"/>
                                    </svg>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    {review.lastEditedBy.node.name && review.date ? (
                        <div className="author-date">
                            <span className="author">Author: {review.lastEditedBy.node.name}</span>
                            |
                            <span className="date">This review was last updated: {DateHandler(review.date, true)}</span>
                        </div>
                    ) : null}

                    {review.content && (
                        <div className="review-content-box">
                            <ExpandableText text={review.content} textExcerpt={540} />
                        </div>
                    )}

                    <div className="review-major-details-box-wrap">

                        <div className="review-major-details-box">
                            <div className="left-side">

                                {review.cpt_reviews.residentsFrom && (
                                    <div className="detail-line residents">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                                <path d="M12.743 4.58535C12.743 7.11771 10.69 9.17049 8.15768 9.17049C5.62531 9.17049 3.57233 7.11771 3.57233 4.58535C3.57233 2.05299 5.62531 0 8.15768 0C10.69 0 12.743 2.05299 12.743 4.58535Z" fill="#C2A57B"/>
                                                <path d="M13.2588 17.7354C13.0298 17.1197 12.9328 16.4627 12.9744 15.8072C13.0152 15.2331 13.1534 14.6704 13.3827 14.1427C11.9509 12.8562 10.0917 12.1487 8.16698 12.1576H8.15143C6.02676 12.1628 4.04687 12.9899 2.58412 14.489C1.1779 15.9364 0.366358 17.8852 0.288818 20.0202L14.8457 19.9943L14.3338 19.4516C13.8617 18.9591 13.4958 18.3749 13.2588 17.7354Z" fill="#C2A57B"/>
                                                <path d="M19.2241 15.7814C19.2241 14.922 18.5507 14.2253 17.7197 14.2253C16.889 14.2253 16.2156 14.922 16.2156 15.7814C16.2156 16.6406 16.889 17.3372 17.7197 17.3372C18.5507 17.3372 19.2241 16.6406 19.2241 15.7814Z" fill="#C2A57B"/>
                                                <path d="M20.5216 13.145C19.7794 12.4003 18.7711 11.9819 17.7197 11.9819C16.6685 11.9819 15.6603 12.4003 14.918 13.145C14.1953 13.872 13.7601 14.836 13.6929 15.8589C13.6584 16.4144 13.7411 16.9709 13.9358 17.4923C14.1426 18.0401 14.4594 18.5397 14.8663 18.9605L17.7197 22.0001L20.5733 18.9605C20.9786 18.5383 21.295 18.0391 21.5038 17.4923C21.6985 16.9709 21.7813 16.4144 21.7467 15.8589C21.6771 14.8366 21.2423 13.8734 20.5216 13.145ZM17.7197 18.0559C16.4896 18.0559 15.4918 17.0323 15.4918 15.7761C15.4918 14.5199 16.4896 13.4966 17.7197 13.4966C18.95 13.4966 19.9478 14.5199 19.9478 15.7761C19.9478 17.0323 18.95 18.0559 17.7197 18.0559Z" fill="#C2A57B"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="22" height="22" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span>
                                            Residents from {review.cpt_reviews.residentsFrom.name === "United Kingdom" ? "UK" : review.cpt_reviews.residentsFrom.name}
                                            {review.cpt_reviews.residentsFrom.tax_review_countries.countryImage && <img src={review.cpt_reviews.residentsFrom.tax_review_countries.countryImage.mediaItemUrl} alt="" /> }
                                        </span>
                                        <svg className="check" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.77395 14.5896L0.248949 9.06456C-0.0829829 8.73263 -0.0829829 8.19444 0.248949 7.86247L1.451 6.66039C1.78293 6.32842 2.32116 6.32842 2.65309 6.66039L6.37499 10.3823L14.3469 2.41039C14.6788 2.07846 15.2171 2.07846 15.549 2.41039L16.751 3.61247C17.083 3.9444 17.083 4.48259 16.751 4.81456L6.97604 14.5896C6.64407 14.9215 6.10588 14.9215 5.77395 14.5896Z" fill="#5FCC6A"/>
                                        </svg>
                                    </div>
                                )}

                                <div className="connection">
                                    {review.cpt_reviews.ipAddressFrom && (
                                        <div className="detail-line ip">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.3581 3.73233H6.58297V9.13077H5.3581V3.73233ZM9.29208 3.692C8.54719 3.692 8.01897 3.74024 7.64178 3.80508V9.13077H8.85163V7.20055C8.96471 7.21637 9.10783 7.22507 9.26835 7.22507C9.98872 7.22507 10.6055 7.04794 11.0222 6.65494C11.3425 6.34971 11.5188 5.90215 11.5188 5.37313C11.5188 4.84491 11.2856 4.39735 10.9424 4.12454C10.5818 3.83592 10.0441 3.692 9.29208 3.692ZM9.25886 6.28645C9.08332 6.28645 8.95443 6.27854 8.85084 6.25403V4.66146C8.93861 4.63774 9.10704 4.61323 9.35613 4.61323C9.96421 4.61323 10.309 4.90976 10.309 5.40556C10.309 5.95829 9.90807 6.28645 9.25886 6.28645ZM7.99999 0C4.3673 0 1.42334 2.94396 1.42334 6.57586C1.42334 10.2078 7.99999 16 7.99999 16C7.99999 16 14.5766 10.2086 14.5766 6.57665C14.5766 2.94475 11.6327 0 7.99999 0ZM8.0166 10.5747C5.60482 10.5747 3.65009 8.61916 3.65009 6.20658C3.65009 3.7948 5.60561 1.84007 8.0166 1.84007C10.4292 1.84007 12.3831 3.79559 12.3831 6.20658C12.3831 8.61837 10.4284 10.5747 8.0166 10.5747Z" fill="#C2A57B"/>
                                            </svg>
                                            <span>IP addr. from {review.cpt_reviews.ipAddressFrom.name}</span>
                                            <svg className="check" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.77395 14.5896L0.248949 9.06456C-0.0829829 8.73263 -0.0829829 8.19444 0.248949 7.86247L1.451 6.66039C1.78293 6.32842 2.32116 6.32842 2.65309 6.66039L6.37499 10.3823L14.3469 2.41039C14.6788 2.07846 15.2171 2.07846 15.549 2.41039L16.751 3.61247C17.083 3.9444 17.083 4.48259 16.751 4.81456L6.97604 14.5896C6.64407 14.9215 6.10588 14.9215 5.77395 14.5896Z" fill="#5FCC6A"/>
                                            </svg>
                                        </div>
                                    )}
                                    {review.cpt_reviews.vpnUsage && (
                                        <div className="detail-line vpn">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.3131 0H0.65625C0.397339 0 0.1875 0.209839 0.1875 0.46875V7.64783C0.1875 10.1748 1.56042 12.5057 3.77051 13.731L7.75732 15.9412C7.828 15.9803 7.90637 16 7.98462 16C8.06287 16 8.14124 15.9803 8.21191 15.9412L12.1987 13.731C14.4088 12.5057 15.7817 10.1748 15.7817 7.64783V0.46875C15.7819 0.209839 15.5719 0 15.3131 0ZM12.8595 8.5448C12.722 8.5448 12.5884 8.48425 12.4976 8.37402L10.9376 6.4801V8.07605C10.9376 8.33496 10.7278 8.5448 10.4689 8.5448C10.2101 8.5448 10.0001 8.33496 10.0001 8.07605V5.17371C10.0001 4.97583 10.1244 4.79932 10.3107 4.73242C10.4968 4.66565 10.705 4.72302 10.8308 4.87573L12.3907 6.76965V5.17371C12.3907 4.91479 12.6006 4.70496 12.8595 4.70496C13.1183 4.70496 13.3282 4.91479 13.3282 5.17371V8.07605C13.3282 8.27393 13.204 8.45044 13.0177 8.51733C12.9659 8.53589 12.9124 8.5448 12.8595 8.5448ZM8.45435 7.09363H7.25818V8.07605C7.25818 8.33496 7.04834 8.5448 6.78943 8.5448C6.53052 8.5448 6.32068 8.33496 6.32068 8.07605V5.17371C6.32068 4.91479 6.53052 4.70496 6.78943 4.70496H8.45435C9.11292 4.70496 9.64868 5.24072 9.64868 5.89929C9.64868 6.55786 9.11292 7.09363 8.45435 7.09363ZM4.30518 6.84509L5.06702 4.99524C5.16553 4.75586 5.43945 4.6416 5.67896 4.74023C5.91833 4.83887 6.03247 5.11279 5.93384 5.35217L4.73865 8.25452C4.66626 8.43018 4.49512 8.5448 4.30518 8.5448C4.11523 8.5448 3.94409 8.43018 3.8717 8.25452L2.67651 5.35217C2.57788 5.11279 2.69202 4.83887 2.9314 4.74023C3.17078 4.64172 3.4447 4.75586 3.54333 4.99524L4.30518 6.84509Z" fill="#C2A57B"/>
                                                <path d="M14.3524 6.8125H13.1562V7.32617H14.3524C14.494 7.32617 14.6093 7.21094 14.6093 7.06934C14.6093 6.92773 14.494 6.8125 14.3524 6.8125Z" fill="#C2A57B"/>
                                            </svg>
                                            <span>VPN usage</span>
                                            <svg className="check" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.77395 14.5896L0.248949 9.06456C-0.0829829 8.73263 -0.0829829 8.19444 0.248949 7.86247L1.451 6.66039C1.78293 6.32842 2.32116 6.32842 2.65309 6.66039L6.37499 10.3823L14.3469 2.41039C14.6788 2.07846 15.2171 2.07846 15.549 2.41039L16.751 3.61247C17.083 3.9444 17.083 4.48259 16.751 4.81456L6.97604 14.5896C6.64407 14.9215 6.10588 14.9215 5.77395 14.5896Z" fill="#5FCC6A"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {bonusesForList.length && (
                                    <div className="bonus-list">
                                        {bonusesForList.map(bonus => {
                                            return(
                                                <div className="detail-line">
                                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.756 0.655961H13.7307C13.6662 0.655961 13.658 0.655961 13.5104 0.511629C13.3148 0.320289 12.9873 0 12.3894 0C11.7914 0 11.4641 0.320289 11.2684 0.511629C11.1209 0.655961 11.1126 0.655961 11.0482 0.655961C10.9839 0.655961 10.9756 0.655961 10.8281 0.511672C10.6325 0.320289 10.3051 0 9.70715 0C9.10924 0 8.78181 0.320289 8.58618 0.511672C8.43867 0.655961 8.43042 0.655961 8.36605 0.655961H7.36243L8.33812 2.78532H13.73L14.756 0.655961Z" fill="#C2A57B"/>
                                                        <path d="M14.1099 16.8495L16.4261 12.9856C16.6836 12.556 17.0862 12.2368 17.5491 12.0759L17.6781 9.65397C16.7478 8.34643 15.4303 7.45316 13.8446 6.65497H8.18434C6.58629 7.45182 5.25817 8.34643 4.32227 9.66394L4.45079 12.0759C4.91369 12.2368 5.31626 12.556 5.57377 12.9856L7.88996 16.8495C8.43867 17.7073 8.6802 18.6978 8.60101 19.6885C9.36766 19.9461 10.1768 20.0805 10.9903 20.0805C11.8111 20.0805 12.6263 19.9439 13.3983 19.6821C13.3207 18.6935 13.5624 17.7055 14.1099 16.8495ZM11.5166 14.5524V15.2604H10.6172V14.5842C9.97936 14.546 9.36061 14.3737 8.97793 14.1378L9.46266 13.0406C9.88367 13.2894 10.445 13.4488 10.9361 13.4488C11.3635 13.4488 11.5165 13.3596 11.5165 13.2065C11.5165 12.6452 9.04806 13.098 9.04806 11.4332C9.04806 10.7125 9.57107 10.1065 10.6171 9.95978V9.26455H11.5165V9.94702C11.9885 9.99166 12.4478 10.1129 12.8113 10.317L12.3585 11.4077C11.9184 11.1844 11.5038 11.076 11.1147 11.076C10.6746 11.076 10.5342 11.2036 10.5342 11.3567C10.5342 11.8925 13.0027 11.4459 13.0027 13.0916C13.0028 13.7806 12.5052 14.3801 11.5166 14.5524Z" fill="#C2A57B"/>
                                                        <path d="M8.82819 4.07477H13.212V5.36598H8.82819V4.07477Z" fill="#C2A57B"/>
                                                        <path d="M6.8359 17.5135L6.82412 17.4945L4.50506 13.6257C4.25502 13.2086 3.71078 13.0789 3.29944 13.3384C2.90168 13.5893 2.77668 14.1116 3.01774 14.5154L5.21142 18.1903L4.10197 18.8466L1.92268 15.163C1.61992 14.6857 1.52543 14.1185 1.65679 13.5644C1.79085 12.9988 2.15823 12.5027 2.66471 12.2032C2.83607 12.102 3.01529 12.0269 3.19765 11.9758L2.96433 7.59691C2.92265 6.81453 2.27614 6.20154 1.49265 6.20154C0.680281 6.20154 0.0210977 6.85892 0.0189063 7.67133L0 14.6718L2.9315 19.7166L2.07247 21.9998H6.38365L7.15945 20.5016C7.52628 19.492 7.40906 18.4049 6.8359 17.5135Z" fill="#C2A57B"/>
                                                        <path d="M21.9999 14.6719L21.981 7.67151C21.9788 6.85914 21.3196 6.20172 20.5072 6.20172C19.7238 6.20172 19.0772 6.81471 19.0356 7.59709L18.8022 11.976C18.9846 12.027 19.1638 12.1021 19.3352 12.2034C19.8417 12.5028 20.209 12.9989 20.3431 13.5645C20.4744 14.1187 20.38 14.6859 20.0772 15.1632L17.898 18.8468L16.7885 18.1905L18.9822 14.5156C19.2232 14.1118 19.0982 13.5895 18.7005 13.3385C18.2892 13.079 17.7449 13.2088 17.4949 13.6259L15.1758 17.4947L15.164 17.5137C14.5909 18.4051 14.4737 19.4921 14.8405 20.5018L15.6163 21.9999H19.9275L19.0684 19.7168L21.9999 14.6719Z" fill="#C2A57B"/>
                                                    </svg>
                                                    <div className="bonus-info">
                                                        <span className="bonus-text">{bonus.name}</span>
                                                        <br/>
                                                        <span className="bonus-name" >{bonus.fieldGroupName.split('_').join(' ')}</span>
                                                        {bonus.tCApply && <span className="tc-apply"> {"*T&C's apply"}</span>}
                                                    </div>
                                                    <svg className="check" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.77395 14.5896L0.248949 9.06456C-0.0829829 8.73263 -0.0829829 8.19444 0.248949 7.86247L1.451 6.66039C1.78293 6.32842 2.32116 6.32842 2.65309 6.66039L6.37499 10.3823L14.3469 2.41039C14.6788 2.07846 15.2171 2.07846 15.549 2.41039L16.751 3.61247C17.083 3.9444 17.083 4.48259 16.751 4.81456L6.97604 14.5896C6.64407 14.9215 6.10588 14.9215 5.77395 14.5896Z" fill="#5FCC6A"/>
                                                    </svg>
                                                </div>
                                            )
                                            
                                        })}
                                    </div>
                                )}

                            </div>

                            <div className="middle-side">
                                {review.cpt_reviews.languageOptions && (
                                    <div className="language-opt">
                                        <span>Language options</span>
                                        <ul>
                                            {review.cpt_reviews.languageOptions.map(lang => {
                                                const text = lang.optionDescription;
                                                const langImageUrl = lang.language.tax_review_languages ? lang.language.tax_review_languages.languageIcon.mediaItemUrl : null;
                                                return (
                                                <li>
                                                    {langImageUrl && <img src={langImageUrl}/>} 
                                                    {text}
                                                </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )}
                                
                                {review.cpt_reviews.paymentMethods && (
                                    <div className="payment-methods">
                                        <PaymentMethodsAccordion paymentMethods={review.cpt_reviews.paymentMethods} />
                                    </div>
                                )}
                                {review.cpt_reviews.gameProvider && (
                                    <div className="game-provider">
                                        <GameProvidersAccordion gameProvider={review.cpt_reviews.gameProvider} />
                                    </div>
                                )}
                            </div>

                            <div className="right-side">
                                {review.cpt_reviews.owner && (
                                    <div className="owner">
                                        <span>Owner</span>
                                        <p>{review.cpt_reviews.owner}</p>
                                    </div>
                                )}
                                {review.cpt_reviews.established && (
                                    <div className="established">
                                        <span>Established</span>
                                        <p>{review.cpt_reviews.established}</p>
                                    </div>
                                )}
                                {review.cpt_reviews.withdrawalLimit && (
                                    <div className="withdrawal-limit">
                                        <span>Withdrawal Limit</span>
                                        <p><b>${review.cpt_reviews.withdrawalLimit}</b> per month</p>
                                    </div>
                                )}
                                {review.cpt_reviews.licensingAuthority && (
                                    <div className="withdrawal-limit">
                                        <span>Licensing Authority</span>
                                        {review.cpt_reviews.licensingAuthority.map(license => {
                                            return <p>{license.name}</p>
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="review-facts-info">

                        {review.cpt_reviews.interestingFacts && (
                            <div className="facts">
                                <h6>Interesting Facts</h6>
                                {review.cpt_reviews.interestingFacts.map(fact => (
                                    <span>{fact.text}</span>
                                ))}
                            </div>
                        )}

                        <div className="pros-cons">
                            {review.cpt_reviews.pros && (
                                <div className="review-pros">
                                    <h6>Positives</h6>
                                    <ul>
                                        {review.cpt_reviews.pros.map(pro => (
                                            <li>{pro.text}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {review.cpt_reviews.cons && (
                                <div className="review-cons">
                                    <h6>Negatives</h6>
                                    <ul>
                                        {review.cpt_reviews.cons.map(con => (
                                            <li>{con.text}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                        </div>
                        {review.cpt_reviews.relatedCasinos && (
                            <div className="related-casinos">
                                <h6>Casinos related to Rox Casino ({review.cpt_reviews.relatedCasinos.length})</h6>
                                <div className="related-casinos__list">
                                    {review.cpt_reviews.relatedCasinos.map(review => (
                                        <div className="related-casino">
                                            {review.featuredImage && <img src={review.featuredImage.node.mediaDetails.filteredSizes[0].sourceUrl} alt=""/>}
                                            <span>{review.title}</span>
                                            <div className="rating">
                                                <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M44.6225 35.5078L49.4638 34.354L46.4839 30.3139C46.0204 29.6836 46.1477 28.7913 46.7684 28.3201C46.7913 28.3026 46.8149 28.2857 46.839 28.27L51 25.4991L46.839 22.7283C46.1913 22.2972 46.0101 21.4142 46.4346 20.756C46.4506 20.7315 46.4673 20.7077 46.4845 20.6844L49.4627 16.6443L44.6242 15.4916C43.8699 15.3122 43.4018 14.5456 43.5791 13.7797C43.5854 13.7506 43.5928 13.722 43.6014 13.6941L45.0338 8.85774L40.0943 9.45478C39.3251 9.54797 38.627 8.98996 38.5352 8.20886C38.5312 8.17857 38.5289 8.14886 38.5272 8.11857L38.2467 3.07548L33.812 5.34482C33.1197 5.69838 32.2765 5.4153 31.9283 4.71283C31.9151 4.68662 31.903 4.65982 31.8916 4.63245L29.9275 0L26.5225 3.67951C25.9925 4.25325 25.1045 4.28179 24.5395 3.743C24.5182 3.72262 24.4976 3.70165 24.4775 3.67951L21.0725 0L19.1084 4.64002C18.8038 5.36287 17.9796 5.69838 17.2671 5.38908C17.2402 5.37743 17.2138 5.3652 17.188 5.35181L12.7493 3.07257L12.4688 8.11391C12.447 8.50709 12.2663 8.87288 11.9692 9.12568C11.6743 9.3808 11.2866 9.49905 10.9017 9.45012L5.96221 8.85366L7.40314 13.69C7.62628 14.4431 7.20582 15.2376 6.46413 15.4642C6.43602 15.4729 6.40734 15.4805 6.37866 15.4875L1.53902 16.6396L4.51726 20.6797C4.98132 21.3099 4.85455 22.2029 4.23446 22.6741C4.21095 22.6916 4.188 22.7079 4.16391 22.7242L0 25.4991L4.16104 28.2723C4.80866 28.7045 4.98935 29.5875 4.56372 30.2452C4.54823 30.2696 4.5316 30.2935 4.51439 30.3168L1.53615 34.3569L6.37636 35.509C7.1301 35.689 7.59817 36.4561 7.42092 37.2221C7.41404 37.25 7.40716 37.278 7.39855 37.3054L5.96622 42.1493L10.9057 41.5522C11.6755 41.459 12.3736 42.0164 12.4653 42.7981C12.4688 42.8278 12.4711 42.8581 12.4728 42.8884L12.7533 47.9315L17.1937 45.6517C17.3893 45.5515 17.6056 45.4985 17.8247 45.4979C17.9887 45.4979 18.1511 45.527 18.3048 45.5853C18.6685 45.7193 18.9616 46.0006 19.1142 46.3617L21.0782 51L24.4827 47.3158C25.0133 46.7421 25.9012 46.7141 26.4657 47.2523C26.4875 47.2727 26.5081 47.2943 26.5282 47.3158L29.9275 50.9983L31.8916 46.36C32.1962 45.6365 33.0204 45.301 33.7329 45.6103C33.7598 45.622 33.7862 45.6348 33.812 45.6476L38.2519 47.9268L38.5324 42.8843C38.576 42.0986 39.2379 41.4975 40.0117 41.5417C40.041 41.5435 40.0702 41.5458 40.0995 41.5493L45.0389 42.1463L43.6066 37.303C43.384 36.5493 43.8045 35.7548 44.5468 35.5288C44.5743 35.5207 44.6013 35.5131 44.6294 35.5067L44.6225 35.5078ZM25.4997 43.0206C16.2025 43.0206 8.66568 35.3675 8.66568 25.9267C8.66568 16.4853 16.2025 8.83211 25.4997 8.83211C34.7975 8.83211 42.3343 16.4853 42.3343 25.9267C42.3246 35.3634 34.7935 43.0107 25.4997 43.0206Z" fill="#C2A57B"/>
                                                </svg>
                                                <span>{review.cpt_reviews.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="complains-result">
                            <h5>No relevant complaints found since 2017</h5>
                            <h5 className="black-points">Black points: 0</h5>
                        </div>

                    </div>
                    
                    
                </div>

                <div className={`${sectionCssClass}__right`}>
                    <TopTenSideBar />
                </div>

            </div>
            
        )
    }

    const BonusList = () => {

        const sectionCssClass = 'main-bonus-list'
        let hasEnglishSiteLang = false
        if(review.cpt_reviews.websiteLanguage && review.cpt_reviews.websiteLanguage.findIndex(e => e.slug === 'english') !== -1){
            hasEnglishSiteLang = true
        }

        return(
            <div className={`${sectionCssClass}`}>
                <div className="row">
                    <div className="column small-12">
                        <h2>Rox Casino Bonus</h2>
                        <img className="tab-content__decor decor-left" src={tabDecorLeft} alt=""/>
                        <img className="tab-content__decor decor-right" src={tabDecorRight} alt=""/>
                    </div>
                    {allBonuses.map((bonus) => {
                        const { name, presentText, exclusiveText, detailsFinalComment, detailsDropdowns, promocode, bonusAffiliateLink } = bonus
                        return (
                            <div className={`${sectionCssClass}__item-wrap column small-12`}>
                                <div className={`${sectionCssClass}__item`}>
                                    <div className="left-section">

                                        <span className="name">
                                            {name}
                                            {hasEnglishSiteLang ? (
                                                <>
                                                    <UKFLAG />
                                                    <svg className="green-check" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.15146 17.597L0.351457 9.79697C-0.117152 9.32836 -0.117152 8.56857 0.351457 8.09991L2.04847 6.40285C2.51708 5.93419 3.27693 5.93419 3.74554 6.40285L8.99999 11.6573L20.2544 0.402849C20.7231 -0.0657607 21.4829 -0.0657607 21.9515 0.402849L23.6485 2.09991C24.1171 2.56852 24.1171 3.32832 23.6485 3.79697L9.84852 17.597C9.37986 18.0656 8.62007 18.0656 8.15146 17.597Z" fill="#5FCC6A"/>
                                                    </svg>
                                                </>
                                            ) : null}
                                        </span>

                                        {presentText ? (
                                            <div className="present-text">
                                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.8125 15.3889V26.2639C1.8125 27.2644 2.62631 28.0764 3.625 28.0764H12.6875V15.3889H1.8125Z" fill="#C2A57B"/>
                                                    <path d="M27.1875 8.13869H21.4528C21.8642 7.85776 22.2176 7.57863 22.4641 7.32851C23.9268 5.85857 23.9268 3.46607 22.4641 1.99613C21.0431 0.564256 18.5673 0.567881 17.1481 1.99613C16.3614 2.78457 14.2771 5.99451 14.5653 8.13869H14.4348C14.7211 5.99451 12.6368 2.78457 11.8519 1.99613C10.4309 0.567881 7.95506 0.567881 6.53587 1.99613C5.075 3.46607 5.075 5.85857 6.53406 7.32851C6.78237 7.57863 7.13581 7.85776 7.54725 8.13869H1.8125C0.813812 8.13869 0 8.95251 0 9.95119V12.6699C0 13.1702 0.406 13.5762 0.90625 13.5762H12.6875V9.95119H16.3125V13.5762H28.0938C28.594 13.5762 29 13.1702 29 12.6699V9.95119C29 8.95251 28.188 8.13869 27.1875 8.13869ZM12.5806 8.07888C12.5806 8.07888 12.5044 8.13869 12.2452 8.13869C10.9928 8.13869 8.60213 6.83732 7.82094 6.05069C7.0615 5.28582 7.0615 4.03882 7.82094 3.27394C8.18888 2.90419 8.67644 2.70119 9.19481 2.70119C9.71138 2.70119 10.1989 2.90419 10.5669 3.27394C11.7885 4.50282 13.0029 7.64207 12.5806 8.07888ZM16.7529 8.13869C16.4956 8.13869 16.4194 8.08069 16.4194 8.07888C15.9971 7.64207 17.2115 4.50282 18.4331 3.27394C19.1636 2.53626 20.4414 2.53263 21.1791 3.27394C21.9403 4.03882 21.9403 5.28582 21.1791 6.05069C20.3979 6.83732 18.0072 8.13869 16.7529 8.13869Z" fill="#C2A57B"/>
                                                    <path d="M16.3125 15.3889V28.0764H25.375C26.3755 28.0764 27.1875 27.2644 27.1875 26.2639V15.3889H16.3125Z" fill="#C2A57B"/>
                                                </svg>
                                                {Parser(presentText)}
                                            </div>
                                        ) : null}

                                        {exclusiveText ? (
                                            <div className="exlusive-text">
                                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.3434 8.67419L15.9387 25.789L28.9999 8.67419H21.3434Z" fill="white"/>
                                                    <path d="M4.21043 2.62048L0.0612793 7.59948H7.11485L4.21043 2.62048Z" fill="white"/>
                                                    <path d="M24.7896 2.62048L21.8851 7.59948H28.9387L24.7896 2.62048Z" fill="white"/>
                                                    <path d="M7.65657 8.67419H0L13.0612 25.789L7.65657 8.67419Z" fill="white"/>
                                                    <path d="M15.7974 2.22473L20.8366 7.26394L23.7759 2.22473H15.7974Z" fill="white"/>
                                                    <path d="M5.224 2.22473L8.16331 7.26394L13.2025 2.22473H5.224Z" fill="white"/>
                                                    <path d="M8.78357 8.67419L14.5 26.7752L20.2164 8.67419H8.78357Z" fill="white"/>
                                                    <path d="M14.4999 2.44727L9.3479 7.5993H19.652L14.4999 2.44727Z" fill="white"/>
                                                </svg>
                                                <span>{Parser(exclusiveText)}</span>
                                            </div>
                                        ) : null}

                                        {detailsDropdowns ? (
                                            detailsDropdowns.map((dropdown) => {
                                                const {detailImage} = dropdown;
                                                
                                                return (
                                                    <DropdownWrap>
                                                        <div className="head">
                                                            {detailImage && <img src={detailImage.mediaItemUrl} alt=""/>}
                                                            {Parser(dropdown.detailDropdownHead)}
                                                        </div>
                                                        <div className="body">
                                                            {Parser(dropdown.detailDropdownBody)}
                                                        </div>
                                                    </DropdownWrap>
                                                )
                                            })
                                            
                                        ) : null}

                                        {detailsFinalComment ? (
                                            <div className="final-comment">
                                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.5 1.8125C7.49356 1.8125 1.8125 7.49356 1.8125 14.5C1.8125 21.5064 7.49356 27.1875 14.5 27.1875C21.5064 27.1875 27.1875 21.5064 27.1875 14.5C27.1875 7.49356 21.5064 1.8125 14.5 1.8125ZM14.5 21.8633C13.8741 21.8633 13.3672 21.3563 13.3672 20.7305C13.3672 20.1046 13.8741 19.5977 14.5 19.5977C15.1259 19.5977 15.6328 20.1046 15.6328 20.7305C15.6328 21.3563 15.1259 21.8633 14.5 21.8633ZM16.2813 15.647C16.0249 15.746 15.8042 15.92 15.6481 16.1464C15.492 16.3727 15.4077 16.6408 15.4062 16.9157V17.5586C15.4062 17.6832 15.3043 17.7852 15.1797 17.7852H13.8203C13.6957 17.7852 13.5938 17.6832 13.5938 17.5586V16.9497C13.5938 16.2955 13.7835 15.6498 14.1573 15.1117C14.5227 14.585 15.0324 14.1828 15.6328 13.9534C16.5957 13.5824 17.2188 12.7753 17.2188 11.8945C17.2188 10.6456 15.9981 9.62891 14.5 9.62891C13.0019 9.62891 11.7812 10.6456 11.7812 11.8945V12.1098C11.7812 12.2344 11.6793 12.3363 11.5547 12.3363H10.1953C10.0707 12.3363 9.96875 12.2344 9.96875 12.1098V11.8945C9.96875 10.7815 10.4559 9.74219 11.3395 8.96904C12.1891 8.22422 13.3105 7.81641 14.5 7.81641C15.6895 7.81641 16.8109 8.22705 17.6605 8.96904C18.5441 9.74219 19.0312 10.7815 19.0312 11.8945C19.0312 13.5314 17.9522 15.0041 16.2813 15.647Z" fill="#C2A57B"/>
                                                </svg>
                                                {Parser(detailsFinalComment)}
                                            </div>
                                        ) : null}
                                        
                                    </div>

                                    <div className="right-section">

                                        <div className="review-info">
                                            {review.featuredImage ? <img src={review.featuredImage.node.mediaItemUrl} alt="" /> : null}
                                            <ReputationEstimate rating={review.cpt_reviews.rating} className="review-info__rep" />
                                            <div className="award-box">
                                                <span>{review.cpt_reviews.rating}</span>
                                                <svg width="98" height="143" viewBox="0 0 98 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M61.1181 101.371C60.5377 102.725 58.9677 103.351 57.6138 102.77C57.2767 102.625 56.9723 102.412 56.7213 102.144L49.4018 94.3456L42.0833 102.144C41.0752 103.219 39.3864 103.272 38.3117 102.263C38.0444 102.012 37.8306 101.708 37.6866 101.371L33.4622 91.5439L28.0563 94.2682V142.997L47.4194 121.483C48.4712 120.389 50.2113 120.353 51.3056 121.405C51.3329 121.43 51.359 121.457 51.3852 121.483L70.7484 143V94.2736L65.3392 91.5439L61.1181 101.371Z" fill="#C2A57B"/>
                                                    <path d="M76.0845 48.5584C76.0845 63.2946 64.138 75.2411 49.4018 75.2411C34.6667 75.2411 22.7203 63.2946 22.7203 48.5584C22.7203 33.8222 34.6667 21.8768 49.4018 21.8768C64.138 21.8768 76.0845 33.8222 76.0845 48.5584Z" fill="#C2A57B"/>
                                                    <path d="M85.7726 66.5076L94.9807 64.3463L89.3129 56.7791C88.4314 55.5986 88.6736 53.9272 89.854 53.0446C89.8977 53.0119 89.9424 52.9802 89.9882 52.9508L97.9024 47.7609L89.9882 42.571C88.7565 41.7636 88.4117 40.1097 89.2191 38.8768C89.2496 38.831 89.2813 38.7863 89.314 38.7426L94.9785 31.1754L85.7759 29.0163C84.3412 28.6803 83.451 27.2446 83.7881 25.8099C83.8001 25.7553 83.8143 25.7019 83.8306 25.6495L86.5549 16.5909L77.1602 17.7092C75.6972 17.8837 74.3694 16.8386 74.1949 15.3755C74.1872 15.3188 74.1829 15.2632 74.1796 15.2064L73.6461 5.76051L65.2116 10.0111C63.8947 10.6733 62.2909 10.1431 61.6287 8.82732C61.6036 8.77823 61.5807 8.72804 61.5589 8.67677L57.8233 1.52588e-05L51.3471 6.89188C50.339 7.96652 48.6501 8.01998 47.5755 7.0108C47.5351 6.97262 47.4958 6.93334 47.4577 6.89188L40.9815 1.52588e-05L37.2459 8.69095C36.6665 10.0449 35.0988 10.6733 33.7437 10.094C33.6925 10.0722 33.6423 10.0492 33.5932 10.0242L25.151 5.75506L24.6175 15.1977C24.576 15.9341 24.2324 16.6193 23.6672 17.0928C23.1065 17.5706 22.3689 17.7921 21.6369 17.7005L12.2422 16.5833L14.9828 25.6419C15.4072 27.0525 14.6075 28.5407 13.1969 28.9651C13.1434 28.9814 13.0889 28.9956 13.0343 29.0087L3.82952 31.1667L9.49401 38.7339C10.3766 39.9144 10.1355 41.5869 8.95615 42.4695C8.91142 42.5022 8.86777 42.5328 8.82195 42.5633L0.902359 47.7609L8.8165 52.9551C10.0482 53.7647 10.3919 55.4186 9.58238 56.6504C9.55293 56.6962 9.52129 56.7409 9.48856 56.7846L3.82407 64.3518L13.03 66.5098C14.4635 66.8469 15.3538 68.2837 15.0167 69.7184C15.0036 69.7708 14.9905 69.8231 14.9741 69.8744L12.2499 78.9472L21.6445 77.8289C23.1086 77.6544 24.4364 78.6985 24.611 80.1626C24.6175 80.2182 24.6219 80.275 24.6251 80.3317L25.1586 89.7776L33.6041 85.5074C33.9761 85.3198 34.3874 85.2205 34.8042 85.2194C35.1162 85.2194 35.425 85.2739 35.7174 85.383C36.4091 85.634 36.9666 86.1609 37.2568 86.8373L40.9924 95.525L47.4675 88.6244C48.4767 87.5498 50.1655 87.4974 51.2391 88.5055C51.2805 88.5437 51.3198 88.584 51.358 88.6244L57.8233 95.5217L61.5589 86.8341C62.1382 85.479 63.706 84.8506 65.061 85.4299C65.1123 85.4518 65.1625 85.4758 65.2116 85.4998L73.6559 89.7689L74.1894 80.3241C74.2723 78.8523 75.5314 77.7264 77.0031 77.8093C77.0588 77.8126 77.1144 77.8169 77.17 77.8235L86.5647 78.9417L83.8404 69.8701C83.4171 68.4583 84.2168 66.9702 85.6286 66.5469C85.681 66.5316 85.7322 66.5174 85.7857 66.5054L85.7726 66.5076ZM49.4018 80.5793C31.7188 80.5793 17.3841 66.2447 17.3841 48.5617C17.3841 30.8776 31.7188 16.5429 49.4018 16.5429C67.0859 16.5429 81.4206 30.8776 81.4206 48.5617C81.402 66.237 67.0783 80.5608 49.4018 80.5793Z" fill="#C2A57B"/>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="promocode-section">
                                            <h6>Use promo code in your account</h6>
                                            <input type="text" readonly value={promocode} />
                                        </div>

                                        <a href={bonusAffiliateLink} className="bonus-aff btn">GET BONUS</a>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const PaymentMethodsSection = () => {
        
        const sectionCssClass = 'pm-section';
        const { paymentMethods } = review.cpt_reviews;
        
        if(paymentMethods === null){
            return null
        }
        return(
            <div className={`${sectionCssClass} row`}>
                <div className="column small-12">
                    <h2>{review.title} Payment methods</h2>
                    <img className="tab-content__decor decor-left" src={paymentDecorLeft} alt=""/>
                    <img className="tab-content__decor decor-right" src={paymentDecorRight} alt=""/>
                </div>
                
                <div className='column small-12 pm__table'>

                    <div className="pm__table--head">
                        <span>Payment Method</span>
                        <span>Deposit<br/>Limits {'&'} Fees</span>
                        <span>Withdrawal<br/> Limits {'&'} Fees</span>
                        <span>Withdrawal<br/> Time</span>
                    </div>
                    <div className="pm__table--body">
                        {paymentMethods.map((method) => {
                            const { title, featuredImage, cpt_payment_methods: { depositLimits, withdrawalLimits, withdrawalTime } } = method
                            return(
                                <div className="pm__table--body-row">
                                    <span>
                                        {featuredImage && <img src={featuredImage.node.mediaItemUrl} alt="" />}
                                        {title}
                                    </span>
                                    {depositLimits ? <span>{depositLimits}</span> : <span>-</span>}
                                    {withdrawalLimits ? <span>{withdrawalLimits}</span> : <span>-</span>}
                                    {withdrawalTime ? <span>{withdrawalTime}</span> : <span>-</span>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const CasinoGamesSection = () => {
        
        const sectionCssClass = 'review-games'

        const { availableGames } = review.cpt_reviews

        if(availableGames === null){
            return null
        }
        
        return(
            <div className={`${sectionCssClass} row`}>
                <h2 className="column small-12">{review.title} Games</h2>

                <div className={`column small-12 ${sectionCssClass}__list`}>
                    {availableGames.map((gameCateg) => {
                        
                        const {uri, name, tax_games_categories:{termIcon}} = gameCateg

                        return(
                            <Link to={uri} className="game-category">
                                <img src={termIcon.mediaItemUrl} alt=""/>
                                <span>{name}</span>
                            </Link>
                        )
                    })}
                </div>
                
            </div>
        )
    }

    const CasinoGameProviders = () => {
        
        const sectionCssClass = 'review-game-providers'
        const { gameProvider } = review.cpt_reviews

        if(gameProvider === null){
            return null
        }

        return(
            <div className={`${sectionCssClass} row`}>
                <h2 className="column small-12">{review.title} Game providers</h2>

                <div className={`column small-12 ${sectionCssClass}__list`}>
                    {gameProvider.map((provider) => {
                        const {uri, title, featuredImage} = provider
                        return(
                            <Link to={uri} className="provider">
                                {featuredImage ? (
                                    <img src={featuredImage.node.mediaItemUrl} alt=""/>
                                ) : <span>{title}</span>}
                                
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }


    return (
        <Layout className={'review-single'} >
            <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title={review.seo.title}
                meta={[
                    { name: "description", content: review.seo.metaDesc },
                    { property: "og:type", content: review.seo.opengraphType },
                ]}
            />
            <MainSection />
            <ComplainFormSection />
            <BonusList />
            <PaymentMethodsSection />
            <CasinoGamesSection />
            <CasinoGameProviders />
            <a href={review.affiliateLink} style={{marginBottom: '44px', marginTop: '37px'}} className="btn btn-center btn-big single-review-btn" >Register at Rox Casino</a>
        </Layout>
    )
}
