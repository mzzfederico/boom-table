import React from "react";
import PropTypes from "prop-types";
import style from "styled-jsx/style";
import Tag from "../Tag";

const WEEK_DAYS = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY" ];

/**
 * Displays a number of photoshoots over the week
 * @param {Array} props.photoshoots our photoshoots of the week
 */
const WeekTable = ({photoshoots = [], mode = "photoshoot"}) => {
    /* I'm building an array of clients which will then have their own shots arranged. */
    const clients = photoshoots.reduce((map, shoot) => {
        const id = shoot.client_id;
        if (map[id]) {
            map[id] = map[id].concat(shoot);
            return map;
        } else {
            map[id] = [ shoot ];
            return map;
        }
    }, {});

    /* I'm building an array of types which will then have their own shots arranged. */
    const types = photoshoots.reduce((map, shoot) => {
        const type = shoot.type;
        if (map[type]) {
            map[type] = map[type].concat(shoot);
            return map;
        } else {
            map[type] = [ shoot ];
            return map;
        }
    }, {});

    /* We reduce the shoots to a single total, taking in account for an offset of the columns */
    const totals = (offset = 2, position = "bottom") => WEEK_DAYS.map(
        (day, i) => (
            <PlainCell key={`${day}-total`} day={day} variant={`total-${position}`} column={i + offset} total={
                photoshoots.filter(shoot => shoot.day_of_the_week === day).reduce(
                    (total, nextShoot) => total + nextShoot.details.number_of_photos, 0
                )}
            />
        )
    );
    
    return (
        <React.Fragment>
            <div className="WeekTable">
                {/* Columns */}

                {/* Displaying the shoots */}
                {mode === "photoshoot" ? WEEK_DAYS.map((day, i) => (
                    <React.Fragment key={day}>
                        <HeaderCell key={day} label={day} column={i + 1} />
                        {totals(1, "top")[i]}
                        {photoshoots
                            .filter(photoshoot => photoshoot.day_of_the_week === day)
                            .map((photoshoot, j) => (
                                <PhotoshootCell 
                                    key={photoshoot.photoshoot_id} 
                                    day={day}
                                    column={i + 1}
                                    photoshoot={photoshoot} 
                                    variant={j % 2 ? "odd" : ""} 
                                />
                            ))
                        }
                    </React.Fragment>
                )) : null}

                {/* Displaying the rows by client */}
                {mode === "client" ? <React.Fragment>
                    <HeaderCell label={"clients"} column={1} />
                    {Object.keys(clients).map(client => <ClientCell>{client}</ClientCell>)}
                    {WEEK_DAYS.map((day, i) => (
                        <React.Fragment key={day}>
                            <HeaderCell label={day} column={i + 2} />
                            {/* For each client, display the total for the day of the week */}
                            {Object.keys(clients)
                                .map((client, j) => {
                                    const shoots = clients[client].filter(shoot => shoot.day_of_the_week === day);
                                    const totalPictures = shoots.reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                    return <PlainCell key={`${day}-${j}`} day={day} total={totalPictures} column={i + 2} photoshoots={shoots.length} variant={j % 2 ? "odd" : ""} />;
                                })}
                            {totals(2, "bottom")[i]}
                        </React.Fragment>
                    ))}
                </React.Fragment> : null}

                {/* Displaying the rows by type of photoshooting */}
                {mode === "type" ? <React.Fragment>
                    <HeaderCell label={"types"} column={1} />
                    {Object.keys(types).map(type => <ClientCell>{type}</ClientCell>)}
                    {WEEK_DAYS.map((day, i) => (
                        <React.Fragment key={day}>
                            <HeaderCell label={day} column={i + 2} />
                            {/* For each client, display the total for the day of the week */}
                            {Object.keys(types)
                                .map((type, j) => {
                                    const shoots = types[type].filter(shoot => shoot.day_of_the_week === day);
                                    const totalPictures = shoots.reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                    return <PlainCell key={`${day}-${j}`} day={day} total={totalPictures} column={i + 2} photoshoots={shoots.length} variant={j % 2 ? "odd" : ""} />;
                                })}
                            {totals(2, "bottom")[i]}
                        </React.Fragment>
                    ))}
                </React.Fragment> : null}

                {/* Displaying the rows by type */}

                <style jsx>{`
                    .WeekTable {
                        display: grid;
                        grid-auto-flow: column;
                        grid-template-columns: repeat(${mode === "photoshoot" ? WEEK_DAYS.length : WEEK_DAYS.length + 1}, 1fr);
                    }

                    .WeekTable > div {
                        padding: 0.5rem;
                    }

                    .WeekTable > .odd {
                        background-color: #f7f7f7;
                    }

                    .WeekTable > .total-bottom {
                        border-top: 2px solid #f7f7f7;
                    }

                    .WeekTable > .total-top {
                        border-bottom: 2px solid #f7f7f7;
                    }
                `}</style>
            </div>
        </React.Fragment>
    );
};

WeekTable.propTypes = {
    photoshoots: PropTypes.array
};

/**
 * Displays the top of the column
 * @param {String} props.label day we're displaying
 * @param {Integer} props.column index of the column we've positioned our data
 */
const HeaderCell = ({ label, column = 1}) => (
    <React.Fragment>
        {/* Column header */}
        <div className={`column column-${label.toLocaleLowerCase()}`}>
            {label.toLocaleLowerCase()}

            <style jsx>{`
                .column {
                    text-transform: lowercase;
                    font-variant: small-caps;
                    font-weight: 500;
                    font-size: 0.85rem;
                    border-bottom: 1px solid #f7f7f7;
                    margin-bottom: 1rem;
                }

                .column-${label.toLocaleLowerCase()} {
                    grid-column: ${column};
                }
            `}</style>
        </div>
    </React.Fragment>
);

HeaderCell.propTypes = {
    day: PropTypes.string,
    column: PropTypes.number
};

/**
 * Displays each of our photoshoots in a single cell
 * @param {String} props.day day we're displaying
 * @param {Photoshoot} props.photoshoot shoot we're showing in the cell
 * @param {String} props.variant adds somekind of special styling (total, odd)
 * @param {Integer} props.column index of the column we've positioned our data
 */
const PhotoshootCell = ({ day, photoshoot, variant = "", column = 1 }) => (
    <div key={photoshoot.id} className={`photoshoot photoshoot-${day.toLocaleLowerCase()} ${variant}`}>
        {/* Metadata */}
        <div className="meta">
            <Tag type={photoshoot.type} /><Tag type={photoshoot.details.package} />
        </div>
        {/* Number of photos */}
        <div className="number_of_photos">
            <span>{photoshoot.details.number_of_photos > 0 ? photoshoot.details.number_of_photos : "n/a"}</span>
            <span className="label">photos</span>
        </div>
        {/* Client identifier */}
        <div className="client">client #{photoshoot.client_id}</div>

        <style jsx>{`
            .photoshoot {
                margin: 0.25rem 0;
            }

            .photoshoot-${day.toLocaleLowerCase()} {
                grid-column: ${column}
            }

            .photoshoot > div {
                margin-bottom: 0.125rem;
            }

            .number_of_photos span:nth-child(1) {
                font-weight: 700;
                margin-right: 0.25rem;
            }

            .number_of_photos span:nth-child(2) {
                font-size: 0.8rem;
            }

            .client {
                font-size: 0.7rem;
            }
        `}</style>
    </div>
);

PhotoshootCell.propTypes = {
    day: PropTypes.string,
    photoshoot: PropTypes.object,
    column: PropTypes.number
};

/**
 * Simply displays the client identifier
 * @param {String} param0 displays the label of the client cell
 */
const ClientCell = ({children}) => (
    <div className="client-head">
        <span>{children}</span>

        <style jsx>{`
            .client-head span {
                margin: 0.25rem 0;
                padding: 0.5rem;
            }    
        `}</style>
    </div>
);

ClientCell.propTypes = {
    children: PropTypes.object
};

/**
 * Displays a combination a simple total of pictures from a number of photoshoots
 * @param {String} props.day day we're displaying
 * @param {Number} props.total total number of pictures
 * @param {Number} props.photoshoots total number of photoshoots
 * @param {String} props.variant adds somekind of special styling (total, odd)
 * @param {Integer} props.column index of the column we've positioned our data
 */
const PlainCell = ({ day, total = 0, variant = "", photoshoots = 0, column = 1 }) => (
    <div className={`client client-${day.toLocaleLowerCase()} ${variant}`}>
        {/* Number of photos */}
        <div className="number_of_photos">
            {total > 0 ? <p className="label"><span>{total}</span> photos</p> : "-"}
        </div>
        {photoshoots > 0 && <span>{Array(photoshoots).fill().map((x, i) => "📷")}</span>}

        <style jsx>{`
            .client-${day.toLocaleLowerCase()} {
                grid-column: ${column}
            }

            .client p {
                font-size: 0.8rem;
                margin: 0;
            }

            .client p span {
                font-size: 1rem;
                font-weight: 700;
            }

            .number_of_photos span:nth-child(2) {
                font-size: 0.7rem;
            }
        `}</style>
    </div>
);

PlainCell.propTypes = {
    day: PropTypes.string,
    variant: PropTypes.string,
    total: PropTypes.number,
    photoshoot: PropTypes.object,
    column: PropTypes.number
};

export default WeekTable;

export { WeekTable, PhotoshootCell, HeaderCell };