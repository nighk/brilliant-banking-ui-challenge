import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, lightGreen } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  title: {
    fontSize: 14,
  },
  rightText: {
    float: "right"
  },
  moneyIn: {
    color: lightGreen["A700"],
  },
  moneyOut: {
    color: red[900],
  }
}));

const TransactionCard = ({ type, amount, accountBalance, dateTime, title }) => {
  const classes = useStyles();

  return (
    <Card raised position="static" className={classes.card}>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={6}> 
            <Typography variant="h5" component="h2" className={classes.rightText}>
              <NumberFormat 
                className={type === "in" ? classes.moneyIn : classes.moneyOut}
                value={amount} 
                displayType={"text"} 
                thousandSeparator={true} 
                prefix={"£"} 
                decimalScale={2}
                fixedDecimalScale
              />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.title} color="textSecondary">
              <Moment format="D MMM YYYY @ HH:MM">{dateTime}</Moment>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={`${classes.title} ${classes.rightText}`} color="textSecondary">
              <NumberFormat 
                value={accountBalance} 
                displayType={"text"} 
                thousandSeparator={true} 
                prefix={"£"} 
                decimalScale={2}
                fixedDecimalScale
              />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

TransactionCard.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  accountBalance: PropTypes.number.isRequired,
  dateTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default TransactionCard;