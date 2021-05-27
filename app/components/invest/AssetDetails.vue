<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()"
                android.systemIcon="ic_menu_back" />
            <Label :text="asset.LegalName"></Label>
        </ActionBar>
        <StackLayout>
            <Assets :asset="asset" horizontalAlignment="stretch"
                :showTitle="true" width="90%" :last="false" />
            <StackLayout class="divider"></StackLayout>

            <StackLayout width="100%" backgroundColor="#F9FAFB">
                <FlexboxLayout flexDirection="column" alignItems="flex-start"
                    alignContent="flex-start" justifyContent="center"
                    width="80%" horizontalAlignment="center" marginTop="30px"
                    marginBottom="30px">
                    <Label textWrap="true" class="details">
                        <FormattedString>
                            <Span text.decode="Legal Name:  &#xa;"
                                class="bold details" />
                            <Span :text="asset.LegalName" />
                        </FormattedString>
                    </Label>
                    <Label textWrap="true" class="details">
                        <FormattedString>
                            <Span text.decode="ISIN:  &#xa;" class="bold" />
                            <Span :text="asset.ISIN" />
                        </FormattedString>
                    </Label>
                    <Label textWrap="true" class="details"
                        v-if="typeAcr == 'EQ' && asset.Exchange">
                        <FormattedString>
                            <Span text.decode="Exchange:  &#xa;"
                                class="bold" />
                            <Span :text="asset.Exchange" />
                        </FormattedString>
                    </Label>
                    <Label textWrap="true" class="details"
                        v-if="typeAcr == 'EQ' && asset.Industry">
                        <FormattedString>
                            <Span text.decode="Industry:  &#xa;"
                                class="bold" />
                            <Span :text="asset.Industry" />
                        </FormattedString>
                    </Label>
                    <Label textWrap="true" class="details"
                        v-if="typeAcr == 'EQ' && asset.Sector">
                        <FormattedString>
                            <Span text.decode="Sector: &#xa;" class="bold" />
                            <Span :text="asset.Sector" />
                        </FormattedString>
                    </Label>
                    <Label textWrap="true" class="details"
                        v-if="typeAcr == 'BND' && asset.Domicile">
                        <FormattedString>
                            <Span text.decode="Domicile: &#xa;"
                                class="bold" />
                            <Span :text="asset.Domicile" />
                        </FormattedString>
                    </Label>
                    <Label textWrap="true" class="details"
                        v-if="typeAcr == 'BND' && asset.Industry">
                        <FormattedString>
                            <Span text.decode="Industry: &#xa;"
                                class="bold" />
                            <Span :text="asset.Industry" />
                        </FormattedString>
                    </Label>
                </FlexboxLayout>
            </StackLayout>
            <Button text="Back To All Assets" @tap="$navigateBack()"
                class="back-btn" />
        </StackLayout>

    </Page>
</template>

<script>
    import TypeAcr from "../invest/TypeAcr";
    import Assets from "../invest/Assets";

    function getChange(last, close) {
        return (Number(last).toFixed(2) - Number(close).toFixed(2)).toFixed(
        2);
    }

    function getChangePercentage(change, close) {
        return ((change / Number(close).toFixed(2)) * 100).toFixed(2);
    }

    export default {
        props: ["asset"],
        data() {
            return {
                showPrice: false,
                typeAcr: "",
                lastPrice: 0,
                change: 0,
                changePercentage: 0
            };
        },
        components: {
            TypeAcr,
            Assets
        },
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
    .details {
        font-size: 16px;
        text-align: left;
        margin: 10px;
    }

    .divider {
        border-width: 0 0 2 0;
        border-color: #F5F7F8;
        width: 100%;
        padding: 2;
    }

    .back-btn {
        background-color: white;
        color: black;
        padding: 0;
        border-color: white;
        border-width: 0;
    }
</style>