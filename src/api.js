import ky from "ky/umd";
/* UMD version bypasses an issue with Jest. Not a fan. */

/**
 * Gets the request amount of photoshoots
 * @param {Number} params.limit max num of photoshoots obtained
 * @param {Number} params.offset offsets from the first photoshoot in the API
 */
const getPhotoshoots = async ({limit = 100, offset = 0}) => {
    console.log(limit, offset);
    const response = await ky.get("/photoshoots_daily/", {
        searchParams: { limit, offset },
        throwHttpErrors: false,
        retry: {
            limit: 0
        },
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });

    const detailsResponse = await ky.get("/photoshoots_details/", {
        searchParams: { limit, offset },
        throwHttpErrors: false,
        retry: {
            limit: 0
        },
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });

    const json = await response.json();
    const detailsJson = await detailsResponse.json();

    const completeJson = json.map(shoot => ({
        ...shoot,
        details: detailsJson.find(detail => detail.id === shoot.id)
    }));

    return { data: completeJson, error: response.ok ? false : json.detail};
};

export {getPhotoshoots};