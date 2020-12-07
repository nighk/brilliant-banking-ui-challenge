import { useDispatch, useSelector } from "react-redux";
import { LinearProgress, Box, Typography, Container, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";

import { getTransactions } from "../store/transactions";
import TransactionCard from "../components/TransactionCard";
import consts from "../consts";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginTop: theme.spacing(1),
    width: "100%"
  }
}));

const AccountDetails = ({accountId}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const transactions = useSelector(state => state.transactions);

  if(!transactions.hasLoaded && !transactions.loading) {
    dispatch(getTransactions(accountId));
  }

  if(transactions.loading) {
    return (
      <LinearProgress color="secondary" />
    );
  } else {
    return (
      <Box m={1}>
        <Container maxWidth="md">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon/>}
            onClick={() => navigate(consts.overviewPath)}
            className={classes.backButton}
          >
            Back to Account Overview
          </Button>
          
          {transactions.list.length === 0 ?
            <Typography>No transactions to show</Typography>
          :
            Object.values(transactions.list).map(transaction => (
              <TransactionCard
                key={transaction.dateTime}
                type={transaction.type}
                amount={transaction.amount}
                accountBalance={transaction.accountBalance}
                dateTime={transaction.dateTime}
                title={transaction.title}
              />
            ))
          }
        </Container>
      </Box>
    );
  } 
}

AccountDetails.defaultProps = {
  accountId: null
};

AccountDetails.propTypes = {
  accountId: PropTypes.string
};

export default AccountDetails;