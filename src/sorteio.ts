import { promises as fs } from "fs";
const links = require("../public/sorteios/links.json")
// import links from "../public/sorteios/links.json"

const get_premios = async () => {
    const dir = 'public/sorteios'
    // const premios = await fs.readdir(dir)
    // const values = premios.map(async premio => {
    //     const description = await fs.readFile(`${dir}/${premio}/description.txt`, { encoding: "utf-8" })
    //     const img = await fs.readFile(`${dir}/${premio}/img.txt`, { encoding: "utf-8" })
    //     return {
    //         premio,
    //         description,
    //         img
    //     }
    // })
    const namep = fs.readFile(`${dir}/name.txt`, { encoding: "utf-8" })
    const descriptionp = fs.readFile(`${dir}/description.txt`, { encoding: "utf-8" })
    const imgp = fs.readFile(`${dir}/img.txt`, { encoding: "utf-8" })
    // const links = await fs.readFile(`${dir}/links.json`, { encoding: "utf-8" })
    const [name,description,img] = await Promise.all([namep,descriptionp,imgp])
    return {
        name,
        description,
        img,
        links
    }
}

export { get_premios }