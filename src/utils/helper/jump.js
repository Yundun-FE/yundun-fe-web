import router from '@/router'

const Jump = {
  applicationsId: (id) => {
    router.push({
      path: `/develop/applications/${id}/setting`
    })
  }
}

export default Jump
