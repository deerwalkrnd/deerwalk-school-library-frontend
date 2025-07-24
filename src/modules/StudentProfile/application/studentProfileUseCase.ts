import { useQuery } from "@tanstack/react-query";
import { StudentProfileRepository } from "../infra/repositories/StudentProfileRepository";


const studentProfileRepository = new StudentProfileRepository()

export const useStudentProfile = () => {
    return useQuery({
        queryKey: ['student-profile'],
        queryFn: () => studentProfileRepository.getStudentProfile(),
        staleTime: 1000 * 60 * 5,
    })
}