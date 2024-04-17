import customPage from "../../event-data-center/container";

async function requestData() {}

customPage({
  onLoad() {
    this.startTime = new Date().getTime();
    this.init();
  },
  async init() {
    const data = await requestData();
    this.setData({ data }, () => {
      this.endTime = new Date().getTime();
      const time = this.endTime - this.startTime;
      console.log(time);
    });
  },
    jump(){
      wx.navigateTo({
        url: '../pageA/index',
      })
    }
});
