import React, {Component} from 'react';
import {CommonTypes} from "../../../Types/Common";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as messageActions from "../../../redux/actions/message-actions";
import * as pageActions from "../../../redux/actions/page-actions";
import {GetApartmentListByManagerUserName, GetMemberListByUserId} from "../../../Services/MemberDefineService";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {MemberUserContract} from "../../../Models/MemberUserContract";
import ComboBox from "../../ToolBox/combo-box";
import DataTable from "../../ToolBox/DataTable";


const style = {
    root: {
        flexGrow: 1
    },
    paper: {
        textAlign: 'center'
    }
}

class MemberList extends Component {

    criteriaContract = {apartmentName: ''};
    

    columns = [
        {name:"firstName", label:"Ad", options:{filter:true,sort:true}},
        {name:"lastName", label:"Soyad", options:{filter:true,sort:true}},
        {name:"userName", label:"Kullanıcı Adı", options:{filter:true,sort:true}},
        {name:"email", label:"Mail", options:{filter:false,sort:false}},
        {name:"apartmentName", label:"Apartman Adı", options:{filter:false,sort:true}},
        {name:"roleName", label:"Kullanıcı Rolü", options:{filter:true,sort:false}},
    ]
    
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            criteria: {
                apartmentId: -1
            },
            apartmentList: [],
            memberList:[]
        }
    }


    componentDidMount() {

        this.props.actions.changeBackdropStatus(true);
        //#region yöneticisi olunan apartman listesi getirilir.

        GetApartmentListByManagerUserName()
            .then((res) => {
                if (res && res.length > 0) {
                    this.setState({apartmentList: res});
                }
            })
            .catch((e) => console.log(e))
            .finally(() => {
                this.props.actions.changeBackdropStatus(false);
            });

        //#endregion

        //#region action
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.memberList.resourceCode
            );
        }
        if (this.props.actions.executeCommand) {
            this.props.actions.executeCommand(this.onExecute);
        }
        //#endregion
    }

    onExecute = (key) => {
        switch (key) {
            case CommonTypes.ActionKeys.GetList:
                let contract = new MemberUserContract();
                contract.apartmentName = this.criteriaContract.apartmentName;
                
                GetMemberListByUserId(contract)
                    .then(
                        res => {
                            if (res.success) {
                                // if (res.value && res.value.length > 0)
                                //     this.props.actions.showMessage(res.value.length.toString() + " adet kayıt getirildi.", CommonTypes.MessageTypes.info)
                                // else
                                //     this.props.actions.showMessage("Hiç kayıt bulunamadı..", CommonTypes.MessageTypes.info);
                                //
                                this.setState({memberList:res.value})
                            }
                        }
                    )
                    .catch(
                        err => {
                            this.props.actions.showMessage("Üye listesi getirilemedi..", CommonTypes.MessageTypes.error)
                        }
                    )
                break;
            case CommonTypes.ActionKeys.Edit:
                this.props.history.push("/admin/definemember");
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div style={style.root}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper>
                            <ComboBox
                                label={"Apartman"}
                                onSelectedItemChange={(item) => {
                                    //                   addressId: 8
                                    // addressText: null
                                    // apartmentId: 5
                                    // apartmentManagerId: 1
                                    // blockList: null
                                    // cityId: 0
                                    // countyId: 0
                                    // managerUserName: null
                                    // name: "postmanTest"
                                    // zipCode: null
                                    // __proto__: Object
                                    
                                    this.criteriaContract.apartmentName = item ? item.name : "";
                                }}
                                itemSource={this.state.apartmentList}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper>
                            <DataTable columns={this.columns} data={this.state.memberList}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

MemberList.propTypes = {};


const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            /**
             * showStatusMessage(message, type)
             */
            showMessage: bindActionCreators(
                messageActions.showStatusMessage,
                dispatch
            ),
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

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);