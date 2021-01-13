import React, { Component } from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    // const { changeToLight, changeToDark } = this.props;

    return (
      <div className="sidebar__content">
        
        <ul className="sidebar__block">
          {/* <SidebarCategory title="UI Elements" icon="diamond">
            <SidebarLink
              title="Alerts"
              route="/ui/alerts"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Buttons"
              route="/ui/buttons"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Carousel"
              route="/ui/carousel"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Collapse"
              route="/ui/collapse"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Grids"
              route="/ui/grids"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Modals"
              route="/ui/modals"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Notifications"
              route="/ui/notifications"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Panels"
              route="/ui/panels"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Progress Bars"
              route="/ui/progress_bars"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Range Sliders"
              route="/ui/range_sliders"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Tabs"
              route="/ui/tabs"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Timeline"
              route="/ui/timeline"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Tooltips & Popovers"
              route="/ui/tooltips"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Typography"
              route="/ui/typography"
              onClick={this.hideSidebar}
            />
          </SidebarCategory> */}
          <SidebarLink
            title="Contact mail"
            icon="envelope"
            route="/mail"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Job mail"
            icon="envelope"
            route="/job"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Chat Application"
            icon="bubble"
            route="/chat"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="ADD JOB"
            icon="book"
            newLink
            route="/todo"
            onClick={this.hideSidebar}
          />
          {/* <SidebarCategory title="Forms" icon="file-add">
            <SidebarLink
              title="Basic Form"
              route="/forms/basic_form"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Check Form Controls"
              route="/forms/check_form_controls"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="File Upload"
              route="/forms/file_upload"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Floating Labels Form"
              route="/forms/floating_labels_form"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Form Dropzone"
              route="/forms/form_dropzone"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Form Layouts"
              route="/forms/form_layouts"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Form Picker"
              route="/forms/form_picker"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Form Validation"
              route="/forms/form_validation"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Mask Form"
              route="/forms/mask_form"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Material Form"
              route="/forms/material_form"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Wizard Form"
              route="/forms/wizard_form"
              onClick={this.hideSidebar}
            />
          </SidebarCategory> */}
          
          <SidebarLink
          icon="list"
              title="Job Available"
              newLink
              route="/tables/material_table"
              onClick={this.hideSidebar}
            />
            
          
{/*           
          
          <SidebarCategory title="Charts" icon="chart-bars">
            <SidebarLink
              title="ChartsJS"
              route="/charts/charts_js"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="React-vis"
              route="/charts/react_vis"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Recharts"
              route="/charts/recharts"
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
          <SidebarCategory title="Maps" icon="map">
            <SidebarLink
              title="Google map"
              route="/maps/google_map"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Vector map"
              route="/maps/vector_map"
              onClick={this.hideSidebar}
            />
          </SidebarCategory> */}
        </ul>
        {/* To there */}

      </div>
    );
  }
}

export default SidebarContent;
