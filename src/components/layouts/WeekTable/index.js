import React from "react";
import PropTypes from "prop-types";
import style from "styled-jsx/style";
import Tag from "../Tag";

const WEEK_DAYS = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY" ];

/* Emits a formatted table using a component specified, formatting function, reducing functions, a column number and a dataset */
function DataColumn({ header = "", shortHeader = "", CellComponent, formatFn, totalFn, column = 0, dataset = [] }) {
    const dataColumn = formatFn(dataset);
    return (
        <React.Fragment>
            <HeaderCell label={header} shortLabel={shortHeader} column={column} />
            {dataColumn.map(cellData => <CellComponent {...{...cellData, column}} />)}
            {typeof totalFn === "function" ? <CellComponent {...{...totalFn(dataset), column}} /> : null}
        </React.Fragment>
    );
}

/* Simple mapping of an array of strings to a bunch of children props */
function mapLabels (array) {
    return array.map(
        element => ({
            children: `${element}`
        })
    );
}

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
    const clientsIds = Object.keys(clients);

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

                {/* Displaying the shoots */}
                {mode === "photoshoot" ? WEEK_DAYS.map((day, i) => (
                    <React.Fragment key={day}>
                        <HeaderCell label={day} shortLabel={day[0]} column={i + 1} />
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
                    {/* Rows */}
                    <DataColumn column={1} dataset={clientsIds} header="Clients" shortHeader="Clients" CellComponent={LabelCell} formatFn={mapLabels} />
                    {/* Days of the week */}
                    {WEEK_DAYS.map((day, i) => {
                        return (
                            <React.Fragment key={day}>
                                <DataColumn
                                    header={day}
                                    shortHeader={day[0]}
                                    dataset={clientsIds} 
                                    CellComponent={PlainCell}
                                    column={i + 2}
                                    totalFn={
                                        () => {
                                            const total = photoshoots.filter(shoot => shoot.day_of_the_week === day).reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                            return { day, total: total, variant: "total-bottom" };
                                        }
                                    }
                                    formatFn={
                                        (clientsIds) => clientsIds.map(
                                            (client, j) => {
                                                const total = clients[client].filter(shoot => shoot.day_of_the_week === day).reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                                return { day, total: total, photoshoots: clients[client].filter(shoot => shoot.day_of_the_week === day).length, variant: j % 2 ? "odd" : "" };
                                            }
                                        )
                                    }
                                />
                            </React.Fragment>
                        );
                    })}
                    {/* Totals at the end of the table */}
                    <React.Fragment>
                        <DataColumn header={"week"} shortHeader={"tot"} dataset={clientsIds} CellComponent={PlainCell} column={9}
                            totalFn={() => {
                                const total = photoshoots.reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                return { day: "week-total", total: total, variant: "total-bottom" };
                            }}
                            formatFn={(clientsIds) => clientsIds.map(
                                (client, j) => {
                                    const total = clients[client].reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                    return { day: "week-total", total: total, photoshoots: clients[client].length, variant: j % 2 ? "odd" : "" };
                                }
                            )}
                        />
                    </React.Fragment>
                </React.Fragment> : null}

                {/* Displaying the rows by type of photoshooting */}
                {mode === "type" ? <React.Fragment>
                    {/* Rows */}
                    <DataColumn column={1} dataset={Object.keys(types)} header="Types" shortHeader="Types"  CellComponent={LabelCell} formatFn={mapLabels} />
                    {/* Days of the week */}
                    {WEEK_DAYS.map((day, i) => {
                        return (
                            <React.Fragment key={day}>
                                <DataColumn
                                    header={day}
                                    shortHeader={day[0]}
                                    dataset={Object.keys(types)}
                                    CellComponent={PlainCell}
                                    column={i + 2}
                                    totalFn={() => {
                                        const total = photoshoots.filter(shoot => shoot.day_of_the_week === day).reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                        return { day, total: total, variant: "total-bottom" };
                                    }}
                                    formatFn={(typesIds) => typesIds.map(
                                        (typeId, j) => {
                                            const total = types[typeId].filter(shoot => shoot.day_of_the_week === day).reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                            return { day, total: total, photoshoots: types[typeId].filter(shoot => shoot.day_of_the_week === day).length, variant: j % 2 ? "odd" : "" };
                                        }
                                    )}
                                />
                            </React.Fragment>
                        );
                    })}
                    {/* Totals at the end of the table */}
                    <React.Fragment>
                        <DataColumn header={"week"} shortHeader={"tot"} dataset={Object.keys(types)} CellComponent={PlainCell} column={9}
                            totalFn={() => {
                                const total = photoshoots.reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                return { day: "week-total", total: total, variant: "total-bottom" };
                            }}
                            formatFn={(typesIds) => typesIds.map(
                                (typeId, j) => {
                                    const total = types[typeId].reduce((total, shoot) => total + shoot.details.number_of_photos, 0);
                                    return { day: "week-total", total: total, variant: j % 2 ? "odd" : "" };
                                }
                            )}
                        />
                    </React.Fragment>
                </React.Fragment> : null}

                {/* Displaying the rows by type */}

                <style jsx>{`
                    .WeekTable {
                        display: grid;
                        grid-auto-flow: column;
                        grid-template-columns: repeat(${mode === "photoshoot" ? WEEK_DAYS.length : WEEK_DAYS.length + 2}, 1fr);
                    }

                    .WeekTable > div {
                        padding: 0.25rem;
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
 * @param {String} props.label label we're displaying
 * @param {String} props.shortLabel shorter label for mobile
 * @param {Integer} props.column index of the column we've positioned our data
 */
const HeaderCell = ({ label = "", shortLabel = "", column = 1}) => (
    <React.Fragment>
        {/* Column header */}
        <div className={`column column-${label.toLocaleLowerCase()}`}>
            <span className="desktop">{label.toLocaleLowerCase()}</span>
            <span className="mobile">{shortLabel.toLocaleLowerCase()}</span>

            <style jsx>{`
                .column {
                    text-transform: lowercase;
                    font-variant: small-caps;
                    font-weight: 500;
                    font-size: 0.85rem;
                    border-bottom: 1px solid #f7f7f7;
                    margin-bottom: 1rem;
                }

                .desktop {
                    display: none;
                }

                @media screen and (min-width: 640px) {
                    .desktop {
                        display: inline;
                    }
                    .mobile {
                        display: none;
                    }
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
            <span>{photoshoot.details.number_of_photos > 0 ? photoshoot.details.number_of_photos.toLocaleString() : "n/a"}</span>
            <span className="label">photos</span>
        </div>
        {/* Client identifier */}
        <div className="client">client #{photoshoot.client_id}</div>

        <style jsx>{`
            @media screen and (max-width: 640px) {
                .meta {
                    display: none;
                }
            }

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
 * Simply displays some data
 * @param {String} params.children displays the label of the cell
 * @param {String} params.column column of the cell
 */
const LabelCell = ({children, column = 0}) => (
    <div className={`label-cell label-column-${column}`}>
        <span>{children}</span>

        <style jsx>{`
            .label-column-${column} {
                grid-column: ${column}
            }
            .label-cell span {
                text-align: right;
                margin: 0.25rem 0;
                padding: 0.5rem 0;
                font-size: 0.85rem;
            }

            @media screen and (min-width: 640px) {
                .label-cell {
                    padding: 0.5rem;
                    font-size: 0.95rem;
                }
            }
        `}</style>
    </div>
);

LabelCell.propTypes = {
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
    <div className={`cell cell-${day.toLocaleLowerCase()} ${variant}`}>
        {/* Number of photos */}
        <div className="number">
            {total > 0 ? <p><span>{total.toLocaleString()}</span> <span className="label">photos</span></p> : "-"}
        </div>
        {photoshoots > 0 ? <React.Fragment>
            <span className={"photoshoots-count"}>{Array(photoshoots).fill().map(() => "📷")}</span>
            <span className={"photoshoots-count-mobile"}>{Array(photoshoots).fill().map(() => "·")}</span>
        </React.Fragment> : null}

        <style jsx>{`
            .cell-${day.toLocaleLowerCase()} {
                grid-column: ${column}
            }

            p {
                margin: 0;
            }

            .label, .photoshoots-count {
                display: none;
            }

            .label {
                font-size: 0.5rem;
            }

            .cell p span {
                font-size: 0.75rem;
                font-weight: 700;
            }

            @media screen and (min-width: 640px) {
                .cell p span {
                    font-size: 1rem;
                    font-weight: 700;
                }
                .label, .photoshoots-count {
                    display: inline;
                }
                .photoshoots-count-mobile {
                    display: none;
                }
            }

            .number span:nth-child(2) {
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

export { WeekTable, PhotoshootCell, HeaderCell, PlainCell };