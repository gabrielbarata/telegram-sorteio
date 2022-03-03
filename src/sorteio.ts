import { promises as fs } from "fs";


const get_premios = async () => {
    const dir = 'public/sorteios'
    const premios = await fs.readdir(dir)
    console.log(premios)
    const values = premios.map(async premio => {
        const description = await fs.readFile(`${dir}/${premio}/descrição.txt`, { encoding: "utf-8" })
        return {
            premio,
            description
        }
    })
    return Promise.all(values)
}

export { get_premios }