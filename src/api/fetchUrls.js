import api from '../utils/baseApi.js'

async function fetchSequential() {
    console.time('sequential')
    for (let i = 1; i <= 10; i++) {
        try {
            const data = await api.get('/posts/' + i)
            console.log(data)                  
        } catch (err) {
            console.error(`request ${i} failed`, err)
        }
    }
    console.timeEnd('sequential')
}

async function fetchParallel() {
    console.time('parallel')
    try {
        const array = []
        for (let i = 1; i <= 10; i++) {
            array.push(api.get('/posts/' + i))
        }
        const results = await Promise.all(array)
        console.log(results)                    
    } catch (err) {
        console.error(err)
    }
    console.timeEnd('parallel')
}


async function main() {
    await fetchSequential();
    await fetchParallel();
}

main();

