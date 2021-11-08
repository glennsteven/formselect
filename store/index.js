export const actions = {
  async getIncidents () {
    const res = await this.$axios.get('/incidents')
    return res
  }
}
