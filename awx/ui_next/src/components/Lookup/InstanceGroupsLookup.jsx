import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { FormGroup, Tooltip } from '@patternfly/react-core';
import { QuestionCircleIcon } from '@patternfly/react-icons';

import { InstanceGroupsAPI } from '@api';
import Lookup from '@components/Lookup';

const getInstanceGroups = async params => InstanceGroupsAPI.read(params);

class InstanceGroupsLookup extends React.Component {
  render() {
    const { value, tooltip, onChange, className, i18n } = this.props;

    /*
      Wrapping <div> added to workaround PF bug:
      https://github.com/patternfly/patternfly-react/issues/2855
    */
    return (
      <div className={className}>
        <FormGroup
          label={
            <Fragment>
              {i18n._(t`Instance Groups`)}{' '}
              {tooltip && (
                <Tooltip position="right" content={tooltip}>
                  <QuestionCircleIcon />
                </Tooltip>
              )}
            </Fragment>
          }
          fieldId="org-instance-groups"
        >
          <Lookup
            id="org-instance-groups"
            lookupHeader={i18n._(t`Instance Groups`)}
            name="instanceGroups"
            value={value}
            onLookupSave={onChange}
            getItems={getInstanceGroups}
            qsNamespace="instance-group"
            multiple
            columns={[
              {
                name: i18n._(t`Name`),
                key: 'name',
                isSortable: true,
                isSearchable: true,
              },
              {
                name: i18n._(t`Modified`),
                key: 'modified',
                isSortable: false,
                isNumeric: true,
              },
              {
                name: i18n._(t`Created`),
                key: 'created',
                isSortable: false,
                isNumeric: true,
              },
            ]}
            sortedColumnKey="name"
          />
        </FormGroup>
      </div>
    );
  }
}

InstanceGroupsLookup.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  tooltip: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InstanceGroupsLookup.defaultProps = {
  tooltip: '',
};

export default withI18n()(InstanceGroupsLookup);
