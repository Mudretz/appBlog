import httpService from "./http.service";

const blogEndpoint = "blog/";

const blogService = {
    create: async (payload) => {
        const { data } = await httpService.post(
            blogEndpoint,
            payload
        );
        return data;
    },
    get: async () => {
        const { data } = await httpService.get(blogEndpoint);
        return data;
    },
    delete: async (payload) => {
        const { data } = await httpService.delete(
            blogEndpoint + payload._id
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            blogEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default blogService;
