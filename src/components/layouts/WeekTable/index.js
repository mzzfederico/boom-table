import React from "react";
import PropTypes from "prop-types";
import style from "styled-jsx/style";

const WEEK_DAYS = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY" ];

/**
 * Displays a number of photoshoots over the week
 * @param {Array} props.photoshoots our photoshoots of the week
 */
const WeekTable = ({photoshoots = []}) => (
    <div className="WeekTable">
        {/* Columns */}
        {WEEK_DAYS.map(
            day => {
                const weekDayProps = {
                    day,
                    photoshoots: photoshoots.filter(photoshoot => photoshoot.day_of_the_week === day)
                };
                return <WeekDayCol key={day} {...weekDayProps} />;
            }
        )}

        <style jsx>{`
            .WeekTable {
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: repeat(${WEEK_DAYS.length}, 1fr);
            }

            .WeekTable > div {
                padding: 0.5rem;
            }
        `}</style>
    </div>
);

WeekTable.propTypes = {
    photoshoots: PropTypes.array
};

/**
 * Displays each of our columns in fragments, to be reassebmled by the CSS grid
 * @param {String} props.day day we're displaying
 */
const WeekDayCol = ({day, photoshoots}) => (
    <React.Fragment>
        <div className={`column column-${day.toLocaleLowerCase()}`} key={day}>
            {day.toLocaleLowerCase()}

            <style jsx>{`
                .column {
                    text-transform: lowercase;
                    font-variant: small-caps;
                    font-weight: 700;
                    font-size: 0.85rem;
                    border-bottom: 1px solid #ccc;
                    margin-bottom: 1rem;
                }

                .column-${day.toLocaleLowerCase()} {
                    grid-column: ${WEEK_DAYS.indexOf(day) + 1};
                }
            `}</style>
        </div>
        {photoshoots.map((photoshoot) => <PhotoshootCell key={photoshoot.photoshoot_id} day={day} photoshoot={photoshoot} />)}
    </React.Fragment>
);

WeekDayCol.propTypes = {
    day: PropTypes.string,
    photoshoots: PropTypes.array
};

/**
 * Displays each of our photoshoots in a single cell
 * @param {String} props.day day we're displaying
 * @param {Photoshoot} props.photoshoot shoot we're showing in the cell
 */
const PhotoshootCell = ({ day, photoshoot }) => (
    <div key={photoshoot.id} className={`photoshoot photoshoot-${day.toLocaleLowerCase()}`}>
        <div className="meta">
            <span className="tag type">{photoshoot.type}</span>
            <span className="tag package">{photoshoot.details.package_size}</span>
        </div>
        <div className="number_of_photos">
            <span>{photoshoot.details.number_of_photos > 0 ? photoshoot.details.number_of_photos : "n/a"}</span>
            <span className="label">photos</span>
        </div>
        <div className="client">client #{photoshoot.client_id}</div>

        <style jsx>{`
            .photoshoot {
                margin: 0.25rem 0;
            }

            .photoshoot-${day.toLocaleLowerCase()} {
                grid-column: ${WEEK_DAYS.indexOf(day) + 1}
            }

            .photoshoot > div {
                margin-bottom: 0.125rem;
            }

            .tag {
                border: 1px solid #ccc;
                color: #ccc;
                text-transform: lowercase;
                font-variant: small-caps;
                font-weight: 700;
                font-size: 0.70rem;
                line-height: 1rem;
                padding: 0.1rem 0.3rem;
                margin-right: 0.25rem;
                border-radius: 5px;
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
    photoshoot: PropTypes.object
};

export default WeekTable;

export { WeekTable, PhotoshootCell, WeekDayCol };