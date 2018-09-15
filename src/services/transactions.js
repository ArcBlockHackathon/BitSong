import { dataSources, getClient } from '../libs/ocap';

const client = getClient(dataSources[0].name);

export default {
  // 根据page和size查询每个block的交易数量，如 await transactionSvc.getNumberTxs({ page: 1000, size: 100 });
  async getNumberTxs({ page = 0, size = 100}) {
    let start = page * size;
    const promiseList = [];
    while(size > 0) {
      promiseList.push(client.doRawQuery(`{
        blocksByHeight(fromHeight: ${start}) {
          data {
            number_txs
          }
        }
      }`));
      start += 10;
      size -= 10;
    }
    return Promise.all(promiseList).then((res) => {
      return res.map(req => req.blocksByHeight.data.map(item => item.number_txs)).reduce((root, item) => root.concat(item), []);
    });
  },
};