import * as audit from "./core/audit";
import * as except from "./core/except";

audit.logException(new except.UnknownException());