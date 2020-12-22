import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ShowStatusError, ShowStatusSuccess } from "../../Core/Helper";
import { InvoiceContract } from "../../Models/Invoice";
import * as pageActions from "../../redux/actions/page-actions";
import { GetExpenceList } from "../../Services/Accounting";
import { CommonTypes } from "../../Types/Common";
import DataTable from "../ToolBox/DataTable";

class ExpenseList extends Component {
  columns = [
    {
      name: "userFullName",
      label: "Kullanıcı",
      options: { filter: true, sort: true },
    },
    {
      name: "apartmentName",
      label: "Apartman Adı",
      options: { filter: true, sort: true },
    },
    {
      name: "companyName",
      label: "Şirket İsmi",
      options: { filter: true, sort: true },
    },
    {
      name: "totalAmount",
      label: "Toplam Tutar",
      options: { filter: true, sort: true },
    },
    {
      name: "invoiceDate",
      label: "Fatura Tarihi",
      options: { filter: true, sort: true },
    },
    {
      name: "invoiceNumber",
      label: "Fatura Numarası",
      options: { filter: true, sort: true },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      apartmentId: null,
      invoiceNumber: null,
      dataList: [],
    };
  }

  componentDidMount() {
    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.ExpenseList.resourceCode
      );
    }
    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
    //#endregion
  }

  onExecute = async (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.GetList:
        let filter = new InvoiceContract();
        filter.apartmentId = this.state.apartmentId;
        filter.userId = this.state.userId;
        filter.invoiceNumber = this.state.invoiceNumber;

        await GetExpenceList({})
          .then((res) => {
            if (res && res.success) {
              if (res.value && res.value.length > 0)
                this.setState({ dataList: res.value });
              ShowStatusSuccess(res.value.length + ": adet kayıt getirildi. ");
            } else if (res && !res.success) {
              ShowStatusError(res.getResultsStringFormat());
            }
          })
          .catch((err) => {
            console.log(err);
            ShowStatusError("liste getirilemedi.");
          });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Typography variant={"h6"}>Kriterler</Typography>
          <TextField label={"Kullanıcı"} />
        </Grid>
        {/*data table*/}
        <Grid item xs={9}>
          <Paper>
            <DataTable
              columns={this.columns}
              data={this.state.dataList}
              onSelectedItemChange={(
                currentRowIndex,
                allRowsIndexes,
                rowsSelectedIndex
              ) => {
                //   if (this.state.messageList.length > 0) {
                //     let lst = this.state.messageList;
                //     let tempList = allRowsIndexes.map((value) => {
                //       return value.dataIndex;
                //     });
                //     let selectedList = [];
                //     tempList.forEach((element) => {
                //       selectedList.push(lst[element]);
                //     });
                //     this.setState({ selectedMessageList: selectedList });
                //   }
              }}
            />
          </Paper>
          {/* {this.state.isOpenDialogForm ? (
              <DialogForm
                title={"Mesaj"}
                content={this.dialogContent}
                handleClose={this.handleCloseDialog}
              />
            ) : (
              <p></p>
            )} */}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeBackdropStatus: bindActionCreators(
        pageActions.changeBackDropStatus,
        dispatch
      ),
      changeActiveResourceCode: bindActionCreators(
        pageActions.changeActiveResourceCode,
        dispatch
      ),
      executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
