export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm:ss";
export const DATETIME_FORMAT_DISPLAY = "MMM Do, YYYY h:mm:ss a";
export const DATE_FORMAT_DISPLAY = "MMM Do, YYYY";
export const TIME_FORMAT_DISPLAY = "h:mm:ss a";
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_DATE = "2023-01-01";
export const DEFAULT_TIME = "00:00:00";
export const DEFAULT_DATETIME = "2023-01-01 00:00:00";
export const DEFAULT_DATETIME_DISPLAY = "Jan 1st, 2023 12:00:00 am";
export const DEFAULT_DATE_DISPLAY = "Jan 1st, 2023";
export const DEFAULT_TIME_DISPLAY = "12:00:00 am";

export const YES = "Yes";
export const NO = "No";

export const APP_DATABASE_URL = "http://localhost:3001/api/v1";
export const TBA_DATABASE_URL = "https://www.thebluealliance.com/api/v3";
export const TBA_KEY = 'fmaAprs7CDKjjWo2HsXoxeHJtiZeiOsGw8gR67qgq81y77UersVFcaDyMAgFs5p9';


export const DEFAULT_EVENT = {
    id: 0,
    key: "",
    name: "",
    start_date: DEFAULT_DATE,
    end_date: DEFAULT_DATE,
    location: "",
    event_type: "",
    event_type_string: "",
    year: 2023,
};
export const DEFAULT_TEAM = {
    id: 0,
    team_number: 0,
    name: "",
    location: "",
    rookie_year: 0,
};
export const DEFAULT_MATCH = {
    id: 0,
    event_id: 0,
    match_number: 0,
    red1: 0,
    red2: 0,
    red3: 0,
    blue1: 0,
    blue2: 0,
    blue3: 0,
    red_score: 0,
    blue_score: 0,
    start_time: DEFAULT_DATETIME,
};
export const DEFAULT_MATCH_DISPLAY = {
    id: 0,
    event_id: 0,
    match_number: 0,
    red1: "",
    red2: "",
    red3: "",
    blue1: "",
    blue2: "",
    blue3: "",
    red_score: 0,
    blue_score: 0,
    start_time: DEFAULT_DATETIME_DISPLAY,
};
export const DEFAULT_TEAM_MATCH = {
    id: 0,
    match_id: 0,
    team_id: 0,
    alliance: "",
    station: "",
    auto_cells_low: 0,
    auto_cells_high: 0,
    teleop_cells_low: 0,
    teleop_cells_high: 0,
    control_panel_position: "",
    control_panel_rotations: 0,
    control_panel_color: "",
    comments: "",
};
export const DEFAULT_TEAM_MATCH_DISPLAY = {
    id: 0,
    match_id: 0,
    team_id: 0,
    alliance: "",
    station: "",
    auto_cells_low: 0,
    auto_cells_high: 0,
    teleop_cells_low: 0,
    teleop_cells_high: 0,
    control_panel_position: "",
    control_panel_rotations: 0,
    control_panel_color: "",
    comments: "",
};
