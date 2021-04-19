
import { Ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'

/**
 * first route
 */
export const FIRST_ROUTE = { title: '首页', key: '/home' }

/**
 * filter route
 */
export function filterRoutr(routes: RouteRecordRaw[]) {
  const { children } = routes[0]
  const result: any[] = [], ALength = children!.length
  const hasChildren = (route: RouteRecordRaw, obj: any) => {
    if (route.children && route.children.length > 0) {
      obj.children = []
      route.children.forEach((v, i) => {
        obj.children.push({ label: v.meta!.title, icon: v.meta!.icon || '', key: v.path || '' })
        if (v.children && v.children.length > 0) {
          hasChildren(v, obj.children[i])
        }
      })
    } else {
      obj.key = route.path
    }
  }
  let i = -1
  while (++i < ALength) {
    const routeObj = children![i]
    result[i] = { label: routeObj.meta!.title, icon: routeObj.meta!.icon || '' }
    hasChildren(routeObj, result[i])
  }
  return result
}

/**
 * add first route active
 */
export interface Routes {
  icon: string;
  key: string;
  label: string;
  children?: Routes[];
}

/**
 * get tab title
 */
export const getTabTitle = (key: string, list: string[], routeList: Ref<any[]>) => {
  const { length } = list
  if (length === 1) {
    return routeList.value.filter(v => v.key === key)[0].label
  }
  const result = routeList.value.filter(v => v.label === list[0])[0].children.filter((v: Routes) => v.key === key)
  return result[0].label
}

/**
 * interface tab
 */
export interface Tab {
  title: string;
  key: string;
}