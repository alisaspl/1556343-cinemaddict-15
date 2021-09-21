import utilsRender from '../utils/render';

import UserModel from '../model/user';
import UserProfileView from '../view/user-profile';

class User {
  constructor(container, userModel) {
    this._container = container;
    this._userModel = userModel;

    this._userModel.addObserver(this._onRankChange.bind(this));

    this._profileView = null;

    const user = this._userModel.getUser();
    if(user.rank !== 0) {
      this._renderProfile();
    }
  }

  _onRankChange(event, payload) {
    if(UserModel.CHANGE_EVENT === event) {
      if(payload.rank === 0) {
        this._removeProfile();
      } else {
        this._removeProfile();
        this._renderProfile();
      }
    }
  }

  _renderProfile() {
    this._profileView = new UserProfileView(this._userModel.getUser());
    utilsRender.renderView(this._container, this._profileView);
  }

  _removeProfile() {
    if(this._profileView !== null) {
      this._profileView.removeElement();
      this._profileView = null;
    }
  }
}

export default User;
