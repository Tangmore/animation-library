import http from '@/lib/request'

// 问题整改总量排名
export function getProblemTotalRank (params: any) {
    return http.post('/stats/rectifyRun/problem/totalRank', params)
}
// 获取问题整改进度
export function getProblemProgress (params: any) {
    return http.post('/stats/rectifyRun/problem/process', params)
}
// 获取质效评价
export function getQualityEvaluate (params: any) {
    return http.post('/stats/rectifyRun/quality/evaluate', params)
}
// 获取问题整改预警
export function getProblemWarning (params: any) {
    return http.post('/stats/rectifyRun/problem/warning', params)
}
// 获取问题整改及时率
export function getProblemTimelyRate (params: any) {
    return http.post('/stats/rectifyRun/problem/timelyRate', params)
}
// 获取问题整改排名——问题清单（弹窗）
export function getProblemList (params: any) {
    return http.get(`/stats/rectifyRun/problem/list`, {params})
}
// 获取问题整改排名——问题流程（弹窗）
export function getProblemFlow (params: any) {
    return http.get(`/stats/rectifyRun/problem/flow`, {params})
}