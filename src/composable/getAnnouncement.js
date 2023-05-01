const getAllAnnouncement = async () => {
    try {
        //const res = await fetch('http://ip22sj3.sit.kmutt.ac.th:8080/sj3/api/announcements')
        // const res = await fetch('http://localhost:4000/data')
        // if(res.status===201)
        const res = await fetch(
            import.meta.env.VITE_ROOT_API + "/api/announcements"
        )        
        if (res.ok) {
            const data = res.json()
            return data        
          } else throw new error('Error, cannot get data!')
    } catch (error) {
        console.log(error)
    }
    return []
  }
  const getAnnouncementById = async (id) => {
    try {
        const res = await fetch(
            import.meta.env.VITE_ROOT_API + "/api/announcements/" + id
        )        
        if (res.ok) {
            const data = res.json()
            return data        
          } else throw new error('Error, cannot get data!')
    } catch (error) {
        console.log(error)
    }
  }


  export { getAllAnnouncement,getAnnouncementById }