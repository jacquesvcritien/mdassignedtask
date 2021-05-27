<template>
    <Page actionBarHidden="true">
        <StackLayout>

            <BottomNavigation @selectedIndexChanged="changeTab($event)"
                :selectedIndex="selectedIndex">
                <TabStrip>
                    <TabStripItem>
                        <Label text="Home"></Label>
                        <Image src="~/images/home.png"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Invest"></Label>
                        <Image src="~/images/invest.png"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Transfer"></Label>
                        <Image src="~/images/transfer.png"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="MeCode"></Label>
                        <Image src="~/images/mecode.png"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="More"></Label>
                        <Image src="~/images/more.png"></Image>
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <Home ref="home" />
                </TabContentItem>
                <TabContentItem>
                    <StackLayout>
                        <Frame id="assetsFrame">
                            <Page>
                                <ActionBar id="action-bar" :title="title"
                                    android:style="margin-left:-15">

                                    <StackLayout class="toolbar-container"
                                        orientation="horizontal">
                                        <FlexboxLayout width="10%"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="flex-start">
                                            <Image alignSelf="center"
                                                src.decode="font://&#xf053;"
                                                @tap="goToHome"
                                                v-show="selectedIndex!=0"
                                                class="fas toolbar-back toolbar-icon">
                                            </Image>
                                        </FlexboxLayout>

                                        <Label :text="title"
                                            class="toolbar-title" width="80%"
                                            textAlignment="center" />

                                        <FlexboxLayout flexDirection="column"
                                            justifyContent="center"
                                            width="10%"
                                            alignItems="flex-start"
                                            @tap="search">
                                            <Image alignSelf="center"
                                                src.decode="font://&#xf002;"
                                                class="fas toolbar-search toolbar-icon"
                                                v-show="selectedIndex==1">
                                            </Image>
                                        </FlexboxLayout>
                                    </StackLayout>

                                </ActionBar>
                                <StackLayout>
                                    <StackLayout>
                                        <Invest ref="invest" />
                                    </StackLayout>
                            </Page>
                        </Frame>
                    </StackLayout>
                </TabContentItem>
                <TabContentItem>
                    <Transfer ref="transfer" />
                </TabContentItem>
                <TabContentItem>
                    <MeCode ref="mecode" />
                </TabContentItem>
                <TabContentItem>
                    <More ref="more" />
                </TabContentItem>
            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>
    import Invest from "./invest/Invest";
    import Home from "./home/Home";
    import Transfer from "./transfer/Transfer";
    import AssetDetails from "./invest/AssetDetails";
    import MeCode from "./mecode/MeCode";
    import More from "./more/More";
    var title = "Home";

    export default {
        data() {
            return {
                title: title,
                selectedIndex: 0
            };
        },
        components: {
            Invest,
            Home,
            Transfer,
            MeCode,
            More,
            AssetDetails
        },

        methods: {
            tryClick() {
                this.$navigateTo(AssetDetails, {
                    frame: "frame1",
                    props: {
                        asset: "HEE"
                    }
                });
            },
            search() {
                this.$refs.invest.search();
            },
            onButtonTap() {
                console.log("Button was pressed");
            },

            changeTab: function(event) {
                this.selectedIndex = event.newIndex;

                switch (event.newIndex) {
                    case 0:
                        this.title = "Home";
                        break;
                    case 1:
                        this.title = "All Assets";
                        break;
                    case 2:
                        this.title = "Transfer";
                        break;
                    case 3:
                        this.title = "Security";
                        break;
                    case 4:
                        this.title = "More";
                        break;
                }
                return;
            },
            goToHome: function() {
                this.$navigateBack();
                this.selectedIndex = 0;
            }
        }
    };
</script>

<style scoped>
    .toolbar-icon {
        width: 40px;
        height: 40px;
        color: #9DA6AB;
        text-align: center;
        font-weight: 200;
    }

    .action-bar {
        width: 100%;
        padding: 0;
    }

    action-bar-space {
        margin-left: -20px
    }

    .toolbar-title {
        font-weight: bold;
        font-size: 15px;
        padding-left: 0;
        padding-right: 0
    }

    BottomNavigation {
        background-color: white;
    }

    TabStrip {
        selected-item-color: #007DC6;
        un-selected-item-color: #7b7b7b;
        highlight-color: #7b7b7b;
        background-color: white;
    }

    TabContentItem {
        background-color: white;
        color: #7b7b7b;
    }

    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }

    .toolbar-container {
        width: 100%;
    }

    TabStripItem.invest-tab {
        font-weight: bold;
        font-size: 12px;
        padding: 20px;
    }

    .active-invest-tab {
        background-color: white;

    }

    TabStrip.invest-tab-wrapper {
        selected-item-color: black;
        un-selected-item-color: #54595E;
        highlight-color: white;
        background-color: #F9FAFB;
    }
</style>