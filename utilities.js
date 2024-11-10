import Pocketbase from 'pocketbase';


class PocketbaseUtility {
  constructor (config) {
    this.username = config.username
    this.password = config.password
    this.port = config.port
    this.url = `http://localhost:${this.port}`
    this.client = new Pocketbase(this.url)
  }


  async authenticateUser() {
    let authData = await this.client.admins.authWithPassword(this.username, this.password)
    return authData;
  }

  async saveFlow(data) {
    let accesstoken = null;
    if (this.client.authStore.isValid) {
      accesstoken = this.client.authStore.token;
    } else {
      await this.authenticateUser()
    }

    // check if the flow already exists
    let flowExists = await this.client.collection('flows').getFirstListItem(`name = "${data.name}"`)

    if (flowExists.status === 404) {
      // does not exist
      let newFlow = await this.client.collection('flows').create(data)
      return newFlow
    } else {
      // update flow
      let updatedFlow = await this.client.collection('flows').update(flowExists.collectionId, data)
      return updatedFlow
    }
  }

  async getFlow(name) {
    let accesstoken = null;

    if (this.client.authStore.isValid){
      accesstoken = this.client.authStore.token;
    } else {
      await this.authenticateUser()
    }

    let flowData = await this.client.collection('flows').getFirstListItem(`name = "${name}"`);
    if (flowData.status === 404) {
      throw new Error("Flow does not exist")
    } else {
      return flowData;
    }
  }


}