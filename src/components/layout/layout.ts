
import { isRef } from 'vue'

/**
 * interface table column
 */
export interface TableColumn {
  prop?: string;
  label?: string;
  width?: number | string;
  type?: string;
  fixed?: "left" | "right" | boolean;
  selectList?: any[];
  read?: boolean;
}

/**
 * interface table extra
 */
export interface TableExtra {
  border: boolean;
}

/**
 * filter table selectList
 */
export const filterTableSelectList = (tableData: any[], tableColumn: unknown[]) => {
  const filterColumn = (tableColumn as TableColumn[]).filter(v => v.type === 'select')
  let i = -1
  const { length } = filterColumn
  while (++i < length) {
    const obj = filterColumn[i], tempList: string[] = []
    const id = obj.prop!
    const selectList = obj.selectList = obj.selectList || []
    tableData.forEach(v => {
      tempList.indexOf(v[id]) < 0 && selectList.push({ text: v[id], value: v[id] })
      tempList.push(v[id])
    })
  }
}

/**
 * base some values to filter array 
 */
export const filterSomeValues = (list: any, key: string, val?: string | boolean, result?: any) => {
  return list.filter((v: { [props: string]: any }) => {
    return val ?
      v[key] === val
      &&
      (isRef(result) ? v['prop'] ? ((result.value) as any[]).push(v['prop']) : true : true)
      :
      v[key]
      &&
      (isRef(result) ? v['prop'] ? ((result.value) as any[]).push(v['prop']) : true : true)
  })
}
