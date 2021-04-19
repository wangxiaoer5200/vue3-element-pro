import axios from '@/utils/request'

export const getTest = async () => {
    const res = (await axios).get(`/Shoping/TopGoods`)
    return res
}