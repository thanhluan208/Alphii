import { useMutation } from "@tanstack/react-query"
import { MATServices } from "@/services"

export default function useMATMutation() {
    const createNewMATSession = useMutation({
        mutationFn: MATServices.createNewMATSession
    })

    return {
        createNewMATSession
    }
}