import axios from 'axios'

function fetch(url, data) {
    return new Promise((resolve, reject) => {
        axios.get(url, data).then(res => {
            // let status = res.data.status
            // if (status === 200) {
            //     resolve(res)
            // }
            // if (status === 300) {
            //     location.href = 'login.html'
            //     resolve(res)
            // }
            // reject(res)
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default fetch