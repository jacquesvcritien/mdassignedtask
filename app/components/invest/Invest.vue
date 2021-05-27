<template>
    <StackLayout>
        <SearchBar hint="Enter asset" :text="searchPhrase"
            textFieldBackgroundColor="red" @textChange="onTextChanged"
            v-show="showSearch" ref="searchBar" class="search" />

        <StackLayout>
            <!-- ASSET TABS -->
            <ScrollView orientation="horizontal"
                scrollBarIndicatorVisible="false">
                <StackLayout orientation="horizontal"
                    class="assets-tab-wrapper">
                    <StackLayout verticalAlignment="center"
                        orientation="horizontal" @tap="assetTabClick(0)"
                        class="asset-tab-btn"
                        :class="{'active-asset-tab': selectedTabIndex==0}"
                        v-shadow="(selectedTabIndex==0) ? shadow : -10">
                        <Image src="~/images/all.png"
                            class="asset-tab-img"
                            v-if="selectedTabIndex==0" />
                        <Image src="~/images/all_bw.png"
                            class="asset-tab-img" v-else />
                        <Label text="All" verticalAlignment="center"
                            class="asset-tab-title" />
                    </StackLayout>
                    <StackLayout verticalAlignment="center"
                        orientation="horizontal" @tap="assetTabClick(1)"
                        class="asset-tab-btn"
                        :class="{'active-asset-tab': selectedTabIndex==1}"
                        v-shadow="(selectedTabIndex==1) ? shadow : -10">

                        <TypeAcr type="EQ" :grey="selectedTabIndex!=1" />
                        <Label text="Equities" verticalAlignment="center"
                            class=" asset-tab-title" />
                    </StackLayout>
                    <StackLayout verticalAlignment="center"
                        orientation="horizontal" @tap="assetTabClick(2)"
                        class="asset-tab-btn"
                        :class="{'active-asset-tab': selectedTabIndex==2}"
                        v-shadow="(selectedTabIndex==2) ? shadow : -10">

                        <TypeAcr type="FND" :grey="selectedTabIndex!=2" />
                        <Label text="Funds" verticalAlignment="center"
                            class=" asset-tab-title" />
                    </StackLayout>
                    <StackLayout verticalAlignment="center"
                        orientation="horizontal" @tap="assetTabClick(3)"
                        class="asset-tab-btn"
                        :class="{'active-asset-tab': selectedTabIndex==3}"
                        v-shadow="(selectedTabIndex==3) ? shadow : -10">
                        <TypeAcr type="ETF" :grey="selectedTabIndex!=3" />
                        <Label text="ETFs" verticalAlignment="center"
                            class="asset-tab-title" />
                    </StackLayout>
                    <StackLayout verticalAlignment="center"
                        orientation="horizontal" @tap="assetTabClick(4)"
                        class="asset-tab-btn"
                        :class="{'active-asset-tab': selectedTabIndex==4}"
                        v-shadow="(selectedTabIndex==4) ? shadow : -10">
                        <TypeAcr type="BND" :grey="selectedTabIndex!=4" />
                        <Label text="Bonds" verticalAlignment="center"
                            class="asset-tab-title" />
                    </StackLayout>

                </StackLayout>

            </ScrollView>
            <!-- ASSET TABS CONTENT -->
            <StackLayout>
                <ScrollView height="700">
                    <Label :text="selectedTabIndex" />
                    <StackLayout>
                        <StackLayout v-for="(asset,index) in assets"
                            class="asset-wrapper">
                            <StackLayout
                                v-show="asset.LegalName.toLowerCase().includes(searchPhrase) && asset.Type.toLowerCase().includes(chosenType)">

                                <ScrollView orientation="horizontal"
                                    :ref="'scroll'+index"
                                    @scroll.native="onScroll"
                                    scrollBarIndicatorVisible="false">
                                    <StackLayout orientation="horizontal"
                                        width="125%">
                                        <StackLayout width="80%"
                                            @tap="goToAsset(index)">
                                            <Assets :asset="asset" :showTitle="false"
                                                horizontalAlignment="stretch"
                                                :last="index == assets.length -1"
                                                class="asset" />
                                        </StackLayout>

                                        <Label class="fas fav-btn"
                                            text.decode="&#xf005;" verticalAlignment="center"
                                            @tap="addToFav(index)"
                                            :style="{color: asset.fav ? '#FFCC4C' : '#DADADA'}" />
                                    </StackLayout>
                                </ScrollView>
                                <StackLayout class="divider"
                                    v-if="index != assets.length -1" />
                            </StackLayout>

                        </StackLayout>

                    </StackLayout>
                </ScrollView>

            </StackLayout>

        </StackLayout>
    </StackLayout>
</template>

<script>
    import Assets from "./Assets";
    import AssetDetails from "./AssetDetails";
    import TypeAcr from "./TypeAcr";
    import axios from "./../../axios";
    import assets from "~/assets.json";
    import {
        ScrollView
    } from "tns-core-modules/ui/scroll-view";
    var showSearch = false;

    //sort
    assets.sort(
        (a, b) =>
        a.LegalName > b.LegalName ? 1 : b.LegalName > a.LegalName ? -1 : 0
    );

    for (var asset in assets) {
        assets[asset].fav = false;
    }

    var requestsActive = assets.length;

    export default {
        data() {
            return {
                showSearch: showSearch,
                searchPhrase: "",
                selectedTabIndex: 0,
                shadow: {
                    elevation: 10,
                    shadowOpacity: 0.15,
                    bgColor: "#EAEBEC",
                    cornerRadius: 40
                },
                assets: assets,
                chosenType: "",
                requestsActive: requestsActive
            };
        },
        components: {
            Assets,
            TypeAcr,
            AssetDetails
        },
        methods: {
            search: function() {
                this.searchPhrase = "";
                if (this.showSearch) {
                    this.$refs.searchBar.nativeView.dismissSoftInput();
                }
                this.showSearch = !this.showSearch;
            },
            onTextChanged: function(event) {
                this.searchPhrase = event.value.toLowerCase();
            },
            indexChange: function(event) {
                this.selectedTabIndex = event.newIndex;
            },
            assetTabClick: function(newTab) {
                this.selectedTabIndex = newTab;
                switch (newTab) {
                    case 0:
                        this.chosenType = "";
                        break;
                    case 1:
                        this.chosenType = "equity";
                        break;
                    case 2:
                        this.chosenType = "fund";
                        break;
                    case 3:
                        this.chosenType = "etf";
                        break;
                    case 4:
                        this.chosenType = "bond";
                        break;
                }
            },
            getLogo(asset_name, index) {
                //get first word of asset name
                var first_asset_word = asset_name.split(" ")[0];
                var asset_acr = "";

                if (first_asset_word.length <= 4) {
                    asset_acr = first_asset_word.toUpperCase();
                } else {
                    asset_acr = asset_name
                        .match(/\b(\w)/g)
                        .join("")
                        .toUpperCase()
                        .substring(0, 4);
                }
                this.assets[index].assetAcr = asset_acr;

                //autocomplete to get assets with that name
                axios
                    .get(
                        "https://autocomplete.clearbit.com/v1/companies/suggest?query=" +
                        first_asset_word
                    )
                    .then(response => {
                        var results = response.data;

                        this.$set(this.assets[index], "logo", "");

                        //loop through results
                        for (var i = 0; i < results.length; i++) {
                            //if name of asset from response is in name of asset in json, take its logo url
                            if (asset_name.includes(results[i].name)) {
                                this.$set(
                                    this.assets[index],
                                    "logo",
                                    results[i].logo + "?size=150"
                                );
                                break;
                            }
                        }

                        this.requestsActive--;
                    });
            },
            onItemTap(event) {
                this.$emit("itemTap", event);
            },
            onPullToRefreshInitiated({
                object
            }) {
                console.log("Pulling...");
                this.$emit("pulling", object);
            },

            onSwipeStarted({
                data,
                object
            }) {
                console.log(`Swipe started`);
                const swipeLimits = data.swipeLimits;
                const swipeView = object;
                const rightItem = swipeView.getViewById("delete-view");
                swipeLimits.right = rightItem.getMeasuredWidth();
                swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
            },
            onLeftSwipeClick({
                object
            }) {
                console.log("left action tapped");
                this.$emit("itemMarked", object.bindingContext);
                this.$refs.listView.notifySwipeToExecuteFinished();
            },
            onRightSwipeClick({
                object
            }) {
                console.log("right action tapped ");
                // remove item
                this.$emit("itemDeleted ", object.bindingContext);
                this.$refs.listView.notifySwipeToExecuteFinished();
            },
            addToFav(index) {
                this.assets[index].fav = !this.assets[index].fav;
            },
            goToAsset(index) {
                this.$navigateTo(AssetDetails, {
                    frame: 'assetsFrame',
                    props: {
                        asset: this.assets[index]
                    }
                });
            }
        },
        beforeMount() {
            for (var asset in assets) {
                this.getLogo(assets[asset].LegalName, asset);
            }
        }
    };
</script>

<style>
    .search {
        font-size: 13px;
    }

    .asset-tab-btn {
        background-color: #F9FAFB;
        color: #54595E;
        font-weight: bold;
        border-radius: 30px;
        height: auto;
        padding:
            20px 30px;
        margin: 20px 20px;
    }

    .active-asset-tab {
        background-color: white;
        color: black;
    }

    .assets-tab-wrapper {
        background-color: #F9FAFB;
    }

    .asset-tab-title {
        background-color: transparent;
        font-size: 12px;
    }

    .asset-outer-wrapper {
        margin: 0;
        padding: 0;
    }

    .asset {
        width: 100%;
    }

    .fav-btn {
        font-size: 30px;
        margin-left: 60px;
        paddinf: 10px;
        border-radius: 50%;
        background-color: white;
    }

    .divider {
        border-width: 0 0 2 0;
        border-color: #F5F7F8;
        width: 100%;
        padding: 2;
    }
</style>