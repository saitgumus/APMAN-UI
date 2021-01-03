import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetIntValue, ShowStatusError } from "../../Core/Helper";
import { TenderContract } from "../../Models/TenderContract";
import * as pageActions from "../../redux/actions/page-actions";
import {
  GetTenderByApartment,
  GetTenderDetail,
} from "../../Services/TenderService";
import { CommonTypes } from "../../Types/Common";
import ApartmentComponent from "../Common/apartment-component";
import DataTable from "../ToolBox/DataTable";
import DialogForm from "../ToolBox/dialog-form";

class TenderList extends Component {
  columns = [
    {
      name: "name",
      label: "İhale Adı",
      options: { filter: true, sort: true },
    },
    {
      name: "apartmentName",
      label: "Apartman Adı",
      options: { filter: true, sort: true },
    },
    {
      name: "beginDate",
      label: "Başlangıç Tarihi",
      options: { filter: true, sort: true },
    },
    {
      name: "endDate",
      label: "Bitiş Tarihi",
      options: { filter: true, sort: true },
    },
    {
      name: "description",
      label: "Açıklama",
      options: { filter: true, sort: true },
    },
    {
      name: "cityName",
      label: "Şehir",
      options: { filter: true, sort: true },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      apartmentId: null,
      dataList: [],
      tenderDetail: null,
      selectedTender: {},
      isOpenDialogForm: false,
    };
  }

  componentDidMount() {
    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.TenderListing.resourceCode
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
        if (GetIntValue(this.state.apartmentId) < 1) {
          ShowStatusError("Apartman seçimi yapınız");
          return;
        }
        let tenderContract = new TenderContract();
        tenderContract.apartmentId = this.state.apartmentId;

        GetTenderByApartment(tenderContract)
          .then((res) => {
            if (res && res.success) {
              if (res.value && res.value.length > 0) {
                this.setState({ dataList: res.value });
              }
            } else {
              ShowStatusError("İhale listesi getirilemedi.");
              return;
            }
          })
          .catch((err) => {
            ShowStatusError("İşlem başarısız oldu..");
            return;
          });

        break;
      case CommonTypes.ActionKeys.Examine:
        let tender = this.state.selectedTender;
        if (!tender) {
          ShowStatusError("Kayıt seçiniz.");
          return;
        }

        GetTenderDetail(tender)
          .then((res) => {
            if (res && res.success) {
              if (res.value) {
                this.setDialogContent(res.value);
                this.setState({
                  tenderDetail: res.value,
                  isOpenDialogForm: true,
                });
              }
            }
          })
          .catch((err) => {
            ShowStatusError("İşlem gerçekleştirilemedi.");
            return;
          });
        break;
      default:
        break;
    }
  };

  dialogContent = (<p>no content..</p>);
  setDialogContent = (value) => {
    this.dialogContent = (
      <Card>
        <CardHeader title={value.name} subheader={value.apartmentName} />
        <CardContent>
          <Grid container spacing={3} direction={"column"}>
            <Grid
              container
              direction={"column"}
              style={{ marginLeft: "30px" }}
              spacing={2}
            >
              <Grid item>
                <Typography variant={"overline"}>
                  Başlangıç Tarihi:{value.beginDate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={"overline"}>
                  Bitiş Tarihi:{value.endDate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={"overline"}>
                  Açıklama:{value.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={"overline"}>
                  Şehir: {value.cityName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={"overline"}>
                  İlçe: {value.countyName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Paper elevation={2}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography variant={"h6"}>Sözleşme Bilgileri</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={"body1"}>
                      Konu: {value.agreement.subject}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={"body1"}>
                      Başlık: {value.agreement.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={"body1"}>
                      Açıklama: {value.agreement.description}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={"body2"}>
                      İçerik: {value.agreement.content}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  handleCloseDialog = () => {
    this.setState({ isOpenDialogForm: false });
  };
  handleOpenDialog = () => {
    this.setState({ isOpenDialogForm: true });
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Grid item>
            <Typography variant={"h6"}>Kriterler</Typography>
          </Grid>
          <Grid item>
            <ApartmentComponent
              onChange={(val) => {
                this.setState({ apartmentId: val.apartmentId });
              }}
            />
          </Grid>
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
                let selected = this.state.dataList[rowsSelectedIndex[0]];
                if (selected && selected.tenderId > 0) {
                  this.setState({ selectedTender: selected });
                }
              }}
            />
          </Paper>
          {this.state.isOpenDialogForm ? (
            <DialogForm
              title={"Masraf Detayı"}
              content={this.dialogContent}
              handleClose={this.handleCloseDialog}
            />
          ) : (
            <p></p>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(TenderList);
