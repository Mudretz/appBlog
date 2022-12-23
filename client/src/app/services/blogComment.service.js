import httpService from "./http.service";
const commentEndpoint = "blogComment/";

const commentService = {
    createBlogComment: async (payload) => {
        const { data } = await httpService.post(commentEndpoint, payload);
        return data;
    },
    getBlogComment: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: "pageId",
                equalTo: `${pageId}`
            }
        });
        return data;
    },
    removeBlogComment: async (blogCommentId) => {
        const { data } = await httpService.delete(commentEndpoint + blogCommentId);
        return data;
    },
    removeAllBlogComment: async (pageId) => {
        const { data } = await httpService.delete(commentEndpoint + `/all/${pageId}`);
        return data;
    }
};
export default commentService;
