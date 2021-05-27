<template>
    <StackLayout>
        <StackLayout orientation="horizontal" class="asset-wrapper">
            <!-- LOGO -->
            <AbsoluteLayout class="asset-img-wrapper" width="20%">
                <StackLayout class="asset-logo-acr" v-if="asset.logo == ''">
                    <Label :text="asset.assetAcr" class="asset-logo-acr-text"
                        android:style="margin-top:40px;font-size: 15px" />
                </StackLayout>
                <Image :src="asset.logo" class="asset-img" v-else />
                <TypeAcr :type="typeAcr" :grey="false" />
            </AbsoluteLayout>
            <!-- TEXT -->
            <FlexboxLayout
                :width="showPrice ? (change != 0) ? '40%' : '55%' : '80%'"
                flexDirection="column" alignItems="flex-start"
                justifyContent="center" alignContent="flex-start">
                <Label :text="asset.LegalName" class="asset-title"
                    verticalAlignment="center" :textWrap="!showPrice || showTitle" />
                <Label :text="'ISIN: '+asset.ISIN" class="asset-desc"
                    verticalAlignment="center" />
            </FlexboxLayout>
            <!-- PRICES -->
            <FlexboxLayout v-id="showPrice"
                :width="(change != 0) ? '40%' : '25%'" flexDirection="column"
                alignItems="flex-end" justifyContent="center"
                alignContent="flex-end">
                <Label textWrap="true" class="price">
                    <FormattedString>
                        <Span text="$" class="price-sign"
                            v-if="asset.Currency == 'USD'" />
                        <Span text="€" class="price-sign"
                            v-else-if="asset.Currency == 'GBP'" />
                        <Span text="£" class="price-sign"
                            v-else-if="asset.Currency == 'EUR'" />
                        <Span text="₽" class="price-sign"
                            v-else-if="asset.Currency == 'RUB'" />
                        <Span text="KR" v-else-if="asset.Currency == 'NOK'"
                            class="price-sign" />
                        <Span text="A$" class="price-sign"
                            v-else />
                        <Span :text="lastPrice" />
                    </FormattedString>
                </Label>
                <Label textWrap="true" class="price-change"
                    :style="{color: (change > 0) ? '#25CE96' : '#FF1D32'}">
                    <FormattedString>
                        <Span text.decode="&#xf0d8;" class="fas"
                            v-if="change > 0" />
                        <Span text.decode="&#xf0d7;" class="fas"
                            v-else-if="change < 0" />
                        <Span text=" " />
                        <Span text="+" v-if="change > 0" />
                        <Span :text="change" v-if="change != 0" />
                        <Span :text="' ('+changePercentage+'%)'"
                            v-if="change != 0" />
                    </FormattedString>
                </Label>
            </FlexboxLayout>
        </StackLayout>
    </StackLayout>
</template>

<script>
    import TypeAcr from "./TypeAcr";

    function getChange(last, close) {
        return (Number(last).toFixed(2) - Number(close).toFixed(2)).toFixed(
        2);
    }

    function getChangePercentage(change, close) {
        return ((change / Number(close).toFixed(2)) * 100).toFixed(2);
    }

    export default {
        props: ["asset", "last", "showTitle"],
        data() {
            return {
                typeAcr: "",
                lastPrice: 0,
                change: 0,
                changePercentage: 0,
                showPrice: false
            };
        },
        components: {
            TypeAcr
        },
        methods: {},
        beforeMount() {
            switch (this.$props.asset.Type) {
                case "equity": {
                    this.showPrice = true;
                    this.typeAcr = "EQ";
                    this.lastPrice = Number(
                        this.$props.asset.LastPrice
                    ).toFixed(2);

                    if (this.$props.asset.ClosePrice) {
                        this.change = getChange(
                            this.lastPrice,
                            this.$props.asset.ClosePrice
                        );
                        this.changePercentage = getChangePercentage(
                            this.change,
                            this.$props.asset.ClosePrice
                        );
                    }
                }
                break;
            case "mutualFund": {
                this.typeAcr = "FND";
            }
            break;
            case "bond": {
                this.showPrice = true;
                this.typeAcr = "BND";
                this.lastPrice = Number(
                    this.$props.asset.LastPrice
                ).toFixed(2);
                if (this.$props.asset.ClosePrice) {
                    this.change = getChange(
                        this.lastPrice,
                        this.$props.asset.ClosePrice
                    );
                    this.changePercentage = getChangePercentage(
                        this.change,
                        this.$props.asset.ClosePrice
                    );
                }
            }
            break;
            case "etf": {
                this.typeAcr = "ETF";
                this.showPrice = true;
                this.lastPrice = Number(
                    this.$props.asset.ClosePrice
                ).toFixed(2);
            }
            break;
            }
        }
    };
</script>

<style>
    .asset-logo-acr {
        background-color: black;
        color: white;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .asset-logo-acr-text {
        color: white;
        text-align: center;
        margin: auto;
        font-size: 20px;
        font-weight: bold;
        height: 100%;
    }

    .asset-img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .asset-img-wrapper {
        margin: 40px 30px;
        margin-left: 0;
        padding-left: 0;
    }


    .asset-title {
        text-align: left;
        width:100%;
        font-size: 15px;
        color: #1F2122;
        font-weight: 400;
        margin-left: 0;
    }

    .asset-desc {
        font-size: 13px;
    }


    .price {
        font-weight: 600;
        font-size: 15px;
        color: #1F2122;
    }

    .price-change {
        font-weight: 600;
        font-size: 13px;
        color: #1F2122;
    }

    .asset-wrapper {
        width: 96%;
    }
</style>