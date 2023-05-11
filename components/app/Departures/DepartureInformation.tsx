import React, { useState, useRef, useEffect } from "react";
import * as Icons from "SVG/Icons";
import ContainedCircle from "components/shared/Buttons/ContainedCircle";
import InputFieldWithIcon from "components/shared/Buttons/InputFieldWithIcon";
import { BiSearch } from "react-icons/bi";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ToggleSwitch from "components/shared/ToggleSwitch/ToggleSwitch";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import StopoverDuringTrip from "./StopoverDuringTrip";
import Dropdown from "components/shared/Dropdown/Dropdown";

interface Props {
  NavigateBack: any;
}

const DepartureInformation: React.FC<Props> = ({ NavigateBack }: Props) => {
  // ========> state for departure date picker
  const [PlaceOfDepartureDate, setPlaceOfDepartureDate] = React.useState<any>();
  const [ArrivalDate, setArrivalDate] = React.useState<any>();
  const [PricePerKgUnit, setPricePerKgUnit] = React.useState<boolean>(false);
  const [PrixUnit, setPrixUnit] = React.useState<boolean>(false);
  const [PièceDropDown, setPièceDropDown] = React.useState<boolean>(false);


  // ======> states for toggles switch
  const [HomePickUpPossibleSwitch, SetHomePickUpPossibleSwitch] =
    useState<boolean>(false);
  const [HomeDeliveryAvailable, SetHomeDeliveryAvailable] =
    useState<boolean>(false);

  const [Inputs, setInputs] = React.useState({
    Departure: "",
    DepartureDate: "",
    Arrival: "",
    ArrivalDate: "",
    DispatchAddress: "",
    DestinationAddress: "",
    PricePerKg: "",
    PricePerKgUnit: "euro",
    AcceptNegotiation: false,
    WithdrawalInAgencySwitch: false,
    DepositInBranch: false
  });
  const InputChange = (evt: any) => {
    const value = evt.target.value;
    setInputs({
      ...Inputs,
      [evt.target.name]: value,
    });
  };
  useEffect(() => {
    setInputs({
      ...Inputs,
      DepartureDate: PlaceOfDepartureDate?.format("YYYY-MM-DD"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PlaceOfDepartureDate]);
  useEffect(() => {
    setInputs({
      ...Inputs,
      ArrivalDate: ArrivalDate?.format("YYYY-MM-DD"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArrivalDate]);

  //====> Room array to add dynamic inputs
  const [RoomNumber, SetRoomNumber] = useState<number[]>([]);


  return (
    <div className="w-full flex flex-col justify-start items-center">
      {/* ======> header */}
      <div className="w-full flex md:flex-row flex-col md:gap-0 gap-4 justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <p
            onClick={NavigateBack}
            className="font-sans cursor-pointer text-base text-black-cool font-normal"
          >
            Mes départs
          </p>
          <Icons.ArrowRight fill="none" stroke="#1A1A1A" ClassName="" />
          <p className="font-sans text-base text-black-cool font-normal">
            Publier un départ
          </p>
        </div>
        {/* =======> button */}
        <ContainedCircle Text="Publier" onClick={() => { }} />
      </div>
      {/* =========> DepartureInformationform */}
      <div className="w-full flex flex-col lg:flex-row gap-6 justify-center items-start py-6">
        {/* =======>left Portion */}
        <div className="w-full lg:w-[65%] flex flex-col gap-8">
          <div className="w-full flex flex-col justify-center items-start bg-white-main shadow-md rounded-md">
            <p className="w-full h-[60px] flex justify-start items-center text-[20px] text-brand-secondary font-semibold font-NunitoSans leading-[32px] border-b-[2px] border-solid border-white-cool px-4">
              Informations sur le départ
            </p>
            {/* =====> departure inputs */}
            <div className="w-full flex flex-col gap-4 justify-center items-start px-4 py-6">
              <p className=" text-[16px] text-brand-secondary font-semibold font-NunitoSans leading-[24px]">
                Départ
              </p>
              {/* ====>place of depature input + sending date */}
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                {/* place of departure */}
                <div className="w-full md:w-[50%]">
                  <InputFieldWithIcon
                    label="Lieu de départ"
                    placeholder="Selectionnez lieu"
                    isLeft={false}
                    icon={<BiSearch className="text-black-cool text-[26px]" />}
                    name="Departure"
                    state={Inputs.Departure}
                    Set_State={InputChange}
                  />
                </div>
                {/* sending date */}
                <div className="w-full md:w-[50%] flex flex-col gap-1">
                  <label
                    className="text-[16px] font-sans font-normla leading-[24px]"
                    htmlFor="sending-date"
                  >
                    Date d’envoi
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={PlaceOfDepartureDate}
                      onChange={(newValue) => {
                        setPlaceOfDepartureDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              {/* ======> Deposit in agency switch */}
              <ToggleSwitch
                label="Dépôt en agence"
                state={Inputs.DepositInBranch}
                Set_State={(Checked: boolean) => {
                  setInputs({
                    ...Inputs,
                    DepositInBranch: Checked,
                  });
                }}
              />

              {/* Home pick-up possible switch */}
              <ToggleSwitch
                label="Ramassage à domicile possible"
                state={HomePickUpPossibleSwitch}
                Set_State={SetHomePickUpPossibleSwitch}
              />
              {/* ====> show pick up address input when homePickSwitch is checked */}
              {HomePickUpPossibleSwitch && (
                <div className="w-full">
                  <InputFieldWithIcon label="Adresse de ramassage" name="DispatchAddress"
                    state={Inputs.DispatchAddress}
                    Set_State={InputChange} />
                </div>
              )}

              <div className="w-full flex flex-col gap-4">
                <p className=" text-[16px] text-brand-secondary font-semibold font-NunitoSans leading-[24px]">
                  Arrivée
                </p>
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                  <div className="w-full md:w-[50%]">
                    <InputFieldWithIcon
                      label="Lieu de départ"
                      placeholder="Selectionnez lieu"
                      isLeft={false}
                      icon={<BiSearch className="text-black-cool text-[26px]" />}
                      name="Arrival"
                      state={Inputs.Arrival}
                      Set_State={InputChange}
                    />
                  </div>
                  <div className="w-full md:w-[50%] flex flex-col gap-1">
                    <label
                      className="text-[16px] font-sans font-normla leading-[24px]"
                      htmlFor="sending-date"
                    >
                      Date d’envoi
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="DatePicker"
                        value={ArrivalDate}
                        onChange={(newValue) => {
                          setArrivalDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>

              {/*  Withdrawal in agency switch */}
              <ToggleSwitch
                label="Retrait en agence"
                state={Inputs.WithdrawalInAgencySwitch}
                Set_State={(Checked: boolean) => {
                  setInputs({
                    ...Inputs,
                    WithdrawalInAgencySwitch: Checked,
                  });
                }}
              />
              {/* =========> Home delivery available switch */}
              <ToggleSwitch
                label="Livraison à domicile possible"
                state={HomeDeliveryAvailable}
                Set_State={SetHomeDeliveryAvailable}
              />
              {/* =====> dispatch address input show when Home delivery available is checked */}
              {HomeDeliveryAvailable && (
                <div className="w-full">
                  <InputFieldWithIcon label="Adresse de dispatch" name="DestinationAddress"
                    state={Inputs.DestinationAddress}
                    Set_State={InputChange} />
                </div>
              )}
            </div>
          </div>
          {/* ===========> Prix Portion */}
          <div className="w-full flex flex-col justify-center items-start bg-white-main shadow-md rounded-md pb-4">
            <p className="w-full h-[60px] flex justify-start items-center text-[20px] text-brand-secondary font-semibold font-NunitoSans leading-[32px] border-b-[2px] border-solid border-white-cool px-4">
              Prix
            </p>
            <div className="w-full flex flex-col justify-center items-start gap-4 px-4 mt-4">
              {/* ========> Price per Kg */}
              <div className="w-full md:w-[50%] flex flex-col justify-center items-start gap-2">
                <label
                  htmlFor=""
                  className="text-[16px] font-sans text-black-cool font-normal leading-[24px]"
                >
                  Prix au Kg
                </label>
                <div className="w-full h-[50px] grid grid-cols-[3fr,1.3fr] border-[1px] border-white-cool rounded-[8px]">
                  {/* ======> input */}
                  <input
                    className="px-2 h-full rounded-[8px] outline-none"
                    type="number"
                    name="PricePerKg"
                    value={Inputs.PricePerKg}
                    onChange={InputChange}
                  />
                  {/* ========> select box */}
                  <Dropdown Styles="w-full h-full z-100 border-l-[1px] border-l-white-cool" Item={PricePerKgData} Placeholder="Unit" State={PricePerKgUnit} Event={setPricePerKgUnit} GetValueEvent={(value: string) => {
                    setInputs({
                      ...Inputs,
                      PricePerKgUnit: value,
                    });
                  }} />

                </div>
              </div>
              {/* Accept negotiation switch */}
              <div className="flex">
                <ToggleSwitch
                  label="Accepter négociation"
                  state={Inputs.AcceptNegotiation}
                  Set_State={(Checked: boolean) => {
                    setInputs({
                      ...Inputs,
                      AcceptNegotiation: Checked,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="w-full flex justify-start items-center text-[16px] text-brand-secondary font-semibold font-NunitoSans leading-[32px]">
                  Prix par pièce
                </p>
                {
                  RoomNumber.length === 0 &&
                  <ContainedCircle
                    Icon={<HiOutlinePlus className="text-brand-main text-[20px]" />}
                    Text="Ajouter une pièce"
                    onClick={() => {
                      let roomNu = RoomNumber.length + 1;
                      SetRoomNumber([...RoomNumber, roomNu]);
                    }}
                    styles="bg-none border-2 border-solid border-brand-main rounded-full text-brand-main w-[170px]"
                  />
                }
              </div>
            </div>
            {RoomNumber.length > 0 && (
              <div className="w-full flex flex-col justify-center items-start">
                {/* Price + Piece input  */}
                <div className="w-full flex flex-col justify-center items-start gap-4 py-4 px-4 ">
                  {RoomNumber.map((room: number, index: number) => {
                    return (
                      <div key={index} className="w-full grid grid-cols-1 md:grid-cols-[3fr,3fr,0.3fr] gap-4 relative">
                        {/* ======> piece selection */}
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor=""
                            className="text-[16px] font-sans text-black-cool font-normal leading-[24px]"
                          >
                            Pièce
                          </label>
                          <Dropdown Styles="w-full border-[1px] rounded-[8px] border-solid border-white-cool h-[50px] z-100 border-l-[1px] border-l-white-cool" Item={PriceData} Placeholder="Séléctionner une pièce" State={PièceDropDown} Event={setPièceDropDown} GetValueEvent={(value: string) => {
                            setInputs({
                              ...Inputs,
                              PricePerKgUnit: value,
                            });
                          }} />
                        </div>
                        {/* ======> price selection */}
                        <div className="flex flex-col justify-center items-start gap-2">
                          <label
                            htmlFor=""
                            className="text-[16px] font-sans text-black-cool font-normal leading-[24px]"
                          >
                            Prix
                          </label>
                          <div className="w-full grid grid-cols-[3fr,1.2fr] border-[1px] rounded-[8px] border-solid border-white-cool">
                            {/* ======> input */}
                            <input
                              className="px-2 h-[50px] rounded-l-[8px] outline-none"
                              type="number"
                              id=""
                              name=""
                            />
                            {/* ========> select box */}
                            <Dropdown Styles="w-full h-full z-100 rounded-r-[8px] border-l-[1px] border-l-white-cool" Item={PricePerKgData} Placeholder="Unit" State={PrixUnit} Event={setPrixUnit} GetValueEvent={(value: string) => {

                            }} />
                          </div>
                        </div>
                        {/* ======> delete icon */}
                        <div className="absolute md:relative right-0 -top-4 md:top-0">
                          <AiOutlineDelete
                            className="text-[30px] text-brand-main cursor-pointer"
                            onClick={(index) => {
                              const rooms = [...RoomNumber];
                              rooms.pop();
                              SetRoomNumber(rooms);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {RoomNumber.length > 0 && (
                    <ContainedCircle
                      Text="Ajouter une autre pièce"
                      styles="bg-none text-brand-main px-4"
                      onClick={() => {
                        let roomNu = RoomNumber.length + 1;
                        SetRoomNumber([...RoomNumber, roomNu]);
                      }}
                      Icon={<HiOutlinePlus className="text-brand-main text-[20px]" />}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ========> right protion */}
        <div className="w-full lg:w-[35%] flex flex-col bg-white-main shadow-md rounded-md">
          <StopoverDuringTrip />
        </div>
      </div>
    </div>
  );
};

export default DepartureInformation;

const PricePerKgData = [
  {
    Name: "Euro",
    Value: "euro",
  },
  {
    Name: "Gram",
    Value: "gram",
  },
  {
    Name: "Kg",
    Value: "kg",
  },
  {
    Name: "Dollar",
    Value: "dollar",
  },
];

const PriceData = [
  {
    Name: "Euro",
    Value: "euro",
  },
  {
    Name: "Gram",
    Value: "gram",
  },
  {
    Name: "Kg",
    Value: "kg",
  },
  {
    Name: "Dollar",
    Value: "dollar",
  },
];
