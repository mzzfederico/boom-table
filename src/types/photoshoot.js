/* We can use these to state clearly what our components expect data to be formatted to. */
/* I'm also leaving here the toolset to mock them. Beware! */

const SIZES = [ "XS", "S", "M", "L", "XL", "XXL", "3XL" ];
const COUNTRIES = [ "ITALY", "FRANCE", "SPAIN", "GERMANY" ];
const WEEK_DAYS = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY" ];
const TYPES = [ "Food", "Events", "Real Estate" ];

function Photoshoot ({
    id = 0,
    day_of_the_week = WEEK_DAYS[(Math.floor(Math.random() * WEEK_DAYS.length))],
    type = TYPES[((Math.floor(Math.random() * TYPES.length)))],
    client_id = (Math.floor(Math.random() * 9) + 1),
    photoshoot_id = 0,
    details = new PhotoshootDetails({id: 0})
}) {
    return {
        id,
        day_of_the_week,
        type,
        client_id,
        photoshoot_id,
        details
    };
}

function PhotoshootDetails ({
    id = 0,
    title = "Test",
    number_of_photos = (Math.floor(Math.random() * 99) + 1),
    country = COUNTRIES[((Math.floor(Math.random() * COUNTRIES.length)))],
    package_size = SIZES[((Math.floor(Math.random() * SIZES.length)))]
}) {
    return {
        id,
        title,
        number_of_photos,
        country,
        "package": package_size
    };
}

function MockPhotoshoot(n) {
    return new Photoshoot({
        "id": n,
        "photoshoot_id": n,
        "details": new PhotoshootDetails({
            id: n
        })
    });
}

export {
    Photoshoot, PhotoshootDetails, MockPhotoshoot
};