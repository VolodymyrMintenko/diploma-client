import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { isLoggedIn } from "pages/auth/reducer/selectors";
import { getCampaign } from "../campaigns/reducer/actions";
import { hasSelectedCampaign } from "../campaigns/reducer/selectors";
import Spinner from "../../components/Spinner";
import NotFound from "pages/notFound";
import AdminCampaign from "./components/AdminCampign";
import UserCampaign from "./components/UserCampaign";
import CampaignNotActive from "./components/CampaignNotActive";

function Campaign({
  match,
  getCampaign,
  isLoading,
  selectedCampaign,
  isLoggedIn,
  hasSelectedCampaign
}) {
  useDocumentTitle("Lesson");
  useEffect(() => {
    getCampaign(match.params.id);
  }, [match, getCampaign]);

  if (isLoading) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }

  if (!hasSelectedCampaign) {
    if (isLoggedIn) {
      return <NotFound />;
    } else {
      return <CampaignNotActive />;
    }
  }

  return (
    <section>
      {isLoggedIn ? (
        <AdminCampaign campaign={selectedCampaign} />
      ) : (
        <UserCampaign campaign={selectedCampaign} />
      )}
    </section>
  );
}

const mapStateToProps = ({ auth, campaigns }) => ({
  isLoggedIn: isLoggedIn(auth),
  isLoading: campaigns.isLoading,
  selectedCampaign: campaigns.selectedCampaign,
  hasSelectedCampaign: hasSelectedCampaign(campaigns)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampaign
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
