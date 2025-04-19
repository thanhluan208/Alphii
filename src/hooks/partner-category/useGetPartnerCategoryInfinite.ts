import { useMemo } from "react"

import { QueryKeys } from "@/lib/constant"
import { PartnerCategories } from "@/services"
import { DefaultResponse, PagingResponse } from "@/types"
import { CategoryData } from "@/types/category.type"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useGetPartnerCategoryInfinite(query?: string) {
	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [QueryKeys.PARTNER_CATEGORY_INFINITE, query],
			queryFn: async ({
				pageParam
			}): Promise<DefaultResponse<PagingResponse<CategoryData[]>>> => {
				const response = await PartnerCategories.getAll({
					page: pageParam || 1,
					query
				})
				return response
			},
			initialPageParam: 1,
			getNextPageParam: (response) => {
				if (!response) return
				const meta = response?.data?.meta
				if (meta?.current >= meta?.pages) return
				return meta.current + 1
			}
		})

	const handleLoadMore = () => {
		const { current, pages } = data?.pages?.[0]?.data?.meta || {}
		if (
			!current ||
			!pages ||
			current >= pages ||
			!hasNextPage ||
			isLoading ||
			!fetchNextPage ||
			isFetchingNextPage
		)
			return
		fetchNextPage()
	}

	const categories = useMemo(() => {
		if (!data || !data.pages) return []

		const arr: CategoryData[] = []

		data.pages?.forEach((elm) => {
			elm.data.result.map((category) => {
				arr.push(category)
			})
		})

		return arr
	}, [data])

	return { data: categories, isLoading, isFetchingNextPage, handleLoadMore }
}
