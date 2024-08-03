import {grey} from '@mui/material/colors';
import {Icon, Stack} from "@mui/material";

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StoreIcon from '@mui/icons-material/Store';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

// Prev Array with Grey Color
function PrevArrowGrey() {
    return (
        <Stack direction="row" spacing={3}>
            <Icon sx={{ color: grey[400] }}><ArrowBackIosOutlinedIcon /></Icon>
        </Stack>
    );
}

// Next Array with Grey Color
function NextArrayGrey() {
    return (
        <Stack direction="row" spacing={3}>
            <Icon sx={{ color: grey[400] }}><ArrowForwardIosOutlinedIcon /></Icon>
        </Stack>
    );
}

export const icons = {
    // check box icons
    CheckBoxOutlineBlankOutlinedIcon,
    CheckBoxOutlinedIcon,
    // favorite icon
    FavoriteBorderOutlinedIcon,
    FavoriteOutlinedIcon,
    // prev and next arrow icons
    ArrowBackIosOutlinedIcon,
    ArrowForwardIosOutlinedIcon,
    PrevArrowGrey,
    NextArrayGrey,
    CloseIcon,
    RadioButtonCheckedIcon,
    RadioButtonUncheckedIcon,
    StoreIcon,
    StarBorderRoundedIcon,
    ZoomInRoundedIcon,
    ErrorOutlineIcon,

    // Thumb up icons
    ThumbUpOffAltIcon,
    ThumbUpAltIcon,
    // Comment icon
    QuestionAnswerIcon,
    // search icon
    SearchOutlinedIcon,
    // star icons
    StarRoundedIcon,
    StarOutlineRoundedIcon,
    // shopping bog icon
    ShoppingBagOutlinedIcon,
    // account icon
    AccountCircleOutlinedIcon,
    // up and down arrows icons
    KeyboardArrowUpOutlinedIcon,
    KeyboardArrowDownOutlinedIcon,
    // close icon
    ClearOutlinedIcon,
    // check Circle icon
    CheckCircleOutlinedIcon,

    KeyboardArrowDownIcon,
    VisibilityIcon,
    VisibilityOffIcon,

}