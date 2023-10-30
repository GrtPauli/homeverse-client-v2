import { CaretRightOutlined } from '@ant-design/icons'
import type { CSSProperties } from 'react'
import React from 'react'
import type { CollapseProps } from 'antd'
import { Collapse, theme } from 'antd'
import { AppCheckInput, AppRadioInput } from '@/components'

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: <p>Room Details</p>,
    children: (
      <div className="flex justify-between px-6 pt-3 pb-5">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Basement</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppRadioInput name="basement" label="Finished" value="Finished" />
                <AppRadioInput
                  name="basement"
                  label="Partially Finished"
                  value="Partially Finished"
                />
              </div>
              <div className="flex flex-col gap-5">
                <AppRadioInput name="basement" label="Unfinished" value="Unfinished" />
                <AppRadioInput name="basement" label="None" value="None" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Floor Covering</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="floorCovering" label="Carpet" value="Carpet" />
                <AppCheckInput name="floorCovering" label="Concrete" value="Concrete" />
                <AppCheckInput name="floorCovering" label="Hardwood" value="Hardwood" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="floorCovering" label="Laminate" value="Laminate" />
                <AppCheckInput
                  name="floorCovering"
                  label="Linoleum / Vinyl"
                  value="Linoleum / Vinyl"
                />
                <AppCheckInput name="floorCovering" label="Tile" value="Tile" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="floorCovering" label="Slate" value="Slate" />
                <AppCheckInput name="floorCovering" label="Softwood" value="Softwood" />
                <AppCheckInput name="floorCovering" label="Other" value="Other" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Appliances</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="appliances" label="Dishwasher" value="Dishwasher" />
                <AppCheckInput name="appliances" label="Dryer" value="Dryer" />
                <AppCheckInput name="appliances" label="Freezer" value="Freezer" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput
                  name="appliances"
                  label="Garbage Disposal"
                  value="Garbage Disposal"
                />
                <AppCheckInput name="appliances" label="Microwave" value="Microwave" />
                <AppCheckInput name="appliances" label="Oven" value="Oven" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="appliances" label="Refrigerator" value="Refrigerator" />
                <AppCheckInput name="appliances" label="Trash Compactor" value="Trash Compactor" />
                <AppCheckInput name="appliances" label="Washer" value="Washer" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Rooms</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="rooms" label="Breakfast Nook" value="Breakfast Nook" />
                <AppCheckInput name="rooms" label="Dining Room" value="Dining Room" />
                <AppCheckInput name="rooms" label="Family Room" value="Family Room" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="rooms" label="Laundry Room" value="Laundry Room" />
                <AppCheckInput name="rooms" label="Library" value="Library" />
                <AppCheckInput name="rooms" label="Master Bath" value="Master Bath" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="rooms" label="Mud Room" value="Mud Room" />
                <AppCheckInput name="rooms" label="Office" value="Office" />
                <AppCheckInput name="rooms" label="Pantry" value="Pantry" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="rooms" label="Recreation Room" value="Recreation Room" />
                <AppCheckInput name="rooms" label="Workshop" value="Workshop" />
                <AppCheckInput name="rooms" label="Sun Room" value="Sun Room" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Indoor Features</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="indoorFeatures" label="Attic" value="Attic" />
                <AppCheckInput name="indoorFeatures" label="Cable Ready" value="Cable Ready" />
                <AppCheckInput name="indoorFeatures" label="Ceilling Fans" value="Ceilling Fans" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="indoorFeatures" label="Double Pane" value="Double Pane" />
                <AppCheckInput name="indoorFeatures" label="Fireplace" value="Fireplace" />
                <AppCheckInput
                  name="indoorFeatures"
                  label="Intercom System"
                  value="Intercom System"
                />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="indoorFeatures" label="Jetted Hub" value="Jetted Hub" />
                <AppCheckInput
                  name="indoorFeatures"
                  label="Security System"
                  value="Security System"
                />
                <AppCheckInput name="indoorFeatures" label="Skylights" value="Skylights" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput
                  name="indoorFeatures"
                  label="Vaulted Ceilling"
                  value="Vaulted Ceilling"
                />
                <AppCheckInput name="indoorFeatures" label="Wet Bar" value="Wet Bar" />
                <AppCheckInput name="indoorFeatures" label="Wired" value="Wired" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: <p>Utility Details</p>,
    children: (
      <div className="flex justify-between px-6 pt-3 pb-5">
        <div>
          <h1 className="mb-3 font-bold border-b pb-3">Heating Type</h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-5">
              <AppCheckInput name="heatingType" label="Baseboard" value="Baseboard" />
              <AppCheckInput name="heatingType" label="Forced Air" value="Forced Air" />
              <AppCheckInput name="heatingType" label="Geothermal" value="Geothermal" />
              <AppCheckInput name="heatingType" label="Heat Pump" value="Heat Pump" />
            </div>
            <div className="flex flex-col gap-5">
              <AppCheckInput name="heatingType" label="Radiant" value="Radiant" />
              <AppCheckInput name="heatingType" label="Stove" value="Stove" />
              <AppCheckInput name="heatingType" label="Wall" value="Wall" />
              <AppCheckInput name="heatingType" label="Other" value="Other" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="mb-3 font-bold border-b pb-3">Heating Fuel</h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-5">
              <AppCheckInput name="heatingFuel" label="Coal" value="Coal" />
              <AppCheckInput name="heatingFuel" label="Electric" value="Electric" />
              <AppCheckInput name="heatingFuel" label="Gas" value="Gas" />
              <AppCheckInput name="heatingFuel" label="Oil" value="Oil" />
            </div>
            <div className="flex flex-col gap-5">
              <AppCheckInput name="heatingFuel" label="Solar" value="Solar" />
              <AppCheckInput name="heatingFuel" label="Wood / Pellet" value="Wood / Pellet" />
              <AppCheckInput name="heatingFuel" label="Other" value="Other" />
              <AppCheckInput name="heatingFuel" label="None" value="None" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="mb-3 font-bold border-b pb-3">Cooling Type</h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-5">
              <AppCheckInput name="coolingType" label="Central" value="Central" />
              <AppCheckInput name="coolingType" label="Evaporative" value="Evaporative" />
              <AppCheckInput name="coolingType" label="Geothermal" value="Geothermal" />
              <AppCheckInput name="coolingType" label="Refrigeration" value="Refrigeration" />
            </div>
            <div className="flex flex-col gap-5">
              <AppCheckInput name="coolingType" label="Solar" value="Solar" />
              <AppCheckInput name="coolingType" label="Wall" value="Wall" />
              <AppCheckInput name="coolingType" label="Other" value="Other" />
              <AppCheckInput name="coolingType" label="None" value="None" />
            </div>
          </div>
        </div>
      </div>
    ),
    style: panelStyle,
  },
  {
    key: '3',
    label: <p>Building Details</p>,
    children: (
      <div className="flex justify-between px-6 pt-3 pb-5">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Parking</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="parking" label="Carport" value="Carport" />
                <AppCheckInput name="parking" label="Garage-Attached" value="Garage-Attached" />
                <AppCheckInput name="parking" label="Garage-Detached" value="Garage-Detached" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="parking" label="Off-Street" value="Off-Street" />
                <AppCheckInput name="parking" label="On-Street" value="On-Street" />
                <AppCheckInput name="parking" label="None" value="None" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">View</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="view" label="City" value="City" />
                <AppCheckInput name="view" label="Mountain" value="Mountain" />
                <AppCheckInput name="view" label="Park" value="Park" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="view" label="Territorial" value="Territorial" />
                <AppCheckInput name="view" label="Water" value="Water" />
                <AppCheckInput name="view" label="None" value="None" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Roof</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="roof" label="Asphalt" value="Asphalt" />
                <AppCheckInput name="roof" label="Built-Up" value="Built-Up" />
                <AppCheckInput name="roof" label="Composition" value="Composition" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="roof" label="Metal" value="Metal" />
                <AppCheckInput name="roof" label="Shake" value="Shake" />
                <AppCheckInput name="roof" label="Slate" value="Slate" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="roof" label="Tile" value="Tile" />
                <AppCheckInput name="roof" label="Shingle" value="Shingle" />
                <AppCheckInput name="roof" label="Other" value="Other" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Exterior</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="exterior" label="Brick" value="Brick" />
                <AppCheckInput name="exterior" label="Concrete" value="Concrete" />
                <AppCheckInput name="exterior" label="Composition" value="Composition" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="exterior" label="Metal" value="Metal" />
                <AppCheckInput name="exterior" label="Shingle" value="Shingle" />
                <AppCheckInput name="exterior" label="Stone" value="Stone" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="exterior" label="Stucco" value="Stucco" />
                <AppCheckInput name="exterior" label="Wood" value="Wood" />
                <AppCheckInput name="exterior" label="Other" value="Other" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Building Amenities</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput
                  name="buildingAmenities"
                  label="Assisted Living Community"
                  value="Assisted Living Community"
                />
                <AppCheckInput
                  name="buildingAmenities"
                  label="Basketball Court"
                  value="Basketball Court"
                />
                <AppCheckInput
                  name="buildingAmenities"
                  label="Controlled Access"
                  value="Controlled Access"
                />
                <AppCheckInput
                  name="buildingAmenities"
                  label="Sports Court"
                  value="Sports Court"
                />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput
                  name="buildingAmenities"
                  label="Disabled Access"
                  value="Disabled Access"
                />
                <AppCheckInput name="buildingAmenities" label="Doorman" value="Doorman" />
                <AppCheckInput name="buildingAmenities" label="Elevator" value="Elevator" />
                <AppCheckInput name="buildingAmenities" label="Storage" value="Storage" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput
                  name="buildingAmenities"
                  label="Fitness Center"
                  value="Fitness Center"
                />
                <AppCheckInput name="buildingAmenities" label="Gated Entry" value="Gated Entry" />
                <AppCheckInput
                  name="buildingAmenities"
                  label="Near Transportation"
                  value="Near Transportation"
                />
                <AppCheckInput
                  name="buildingAmenities"
                  label="Tennis Court"
                  value="Tennis Court"
                />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Architectural Style</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppRadioInput name="architecturalStyle" label="Bungalow" value="Bungalow" />
                <AppRadioInput name="architecturalStyle" label="Modern" value="Modern" />
                <AppRadioInput name="architecturalStyle" label="Cape Cod" value="Cape Cod" />
                <AppRadioInput name="architecturalStyle" label="Georgian" value="Georgian" />
              </div>
              <div className="flex flex-col gap-5">
                <AppRadioInput
                  name="architecturalStyle"
                  label="Queen Anne / Victorian"
                  value="Queen Anne / Victorian"
                />
                <AppRadioInput
                  name="architecturalStyle"
                  label="Ranch / Rambler"
                  value="Ranch / Rambler"
                />
                <AppRadioInput
                  name="architecturalStyle"
                  label="Santa Fe / Pueblo Style"
                  value="Santa Fe / Pueblo Style"
                />
                <AppRadioInput name="architecturalStyle" label="Split-Level" value="Split-Level" />
              </div>
              <div className="flex flex-col gap-5">
                <AppRadioInput name="architecturalStyle" label="Colonial" value="Colonial" />
                <AppRadioInput
                  name="architecturalStyle"
                  label="Contemporary"
                  value="Contemporary"
                />
                <AppRadioInput name="architecturalStyle" label="Craftsman" value="Craftsman" />
                <AppRadioInput name="architecturalStyle" label="Tudor" value="Tudor" />
              </div>
              <div className="flex flex-col gap-5">
                <AppRadioInput name="architecturalStyle" label="Spanish" value="Spanish" />
                <AppRadioInput name="architecturalStyle" label="French" value="French" />
                <AppRadioInput name="architecturalStyle" label="Loft" value="Loft" />
                <AppRadioInput name="architecturalStyle" label="Other" value="Other" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="mb-3 font-bold border-b pb-3">Outdoor Amenities</h1>
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <AppCheckInput name="outdoorAmenities" label="Balcony" value="Balcony" />
                <AppCheckInput
                  name="outdoorAmenities"
                  label="Barbecue Area"
                  value="Barbecue Area"
                />
                <AppCheckInput name="outdoorAmenities" label="Deck" value="Deck" />
                <AppCheckInput name="outdoorAmenities" label="RV Parking" value="RV Parking" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="outdoorAmenities" label="Dock" value="Dock" />
                <AppCheckInput name="outdoorAmenities" label="Fenced Yard" value="Fenced Yard" />
                <AppCheckInput name="outdoorAmenities" label="Garden" value="Garden" />
                <AppCheckInput name="outdoorAmenities" label="Sauna" value="Sauna" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="outdoorAmenities" label="Greenhouse" value="Greenhouse" />
                <AppCheckInput name="outdoorAmenities" label="Hot Tub" value="Hot Tub" />
                <AppCheckInput name="outdoorAmenities" label="Lawn" value="Lawn" />
                <AppCheckInput name="outdoorAmenities" label="Waterfront" value="Waterfront" />
              </div>
              <div className="flex flex-col gap-5">
                <AppCheckInput name="outdoorAmenities" label="Pond" value="Pond" />
                <AppCheckInput name="outdoorAmenities" label="Pool" value="Pool" />
                <AppCheckInput name="outdoorAmenities" label="Porch" value="Porch" />
                <AppCheckInput
                  name="outdoorAmenities"
                  label="Sprinkler System"
                  value="Sprinkler System"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    style: panelStyle,
  },
]

export const AdditionalInfo = () => {
  const { token } = theme.useToken()

  const panelStyle: React.CSSProperties = {
    marginBottom: 20,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  return (
    <div className="mb-10">
      <h1 className="font-bold text-lg border-b pb-3 mb-5">Additional Info</h1>

      <Collapse
        bordered={false}
        defaultActiveKey={[]}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </div>
  )
}
