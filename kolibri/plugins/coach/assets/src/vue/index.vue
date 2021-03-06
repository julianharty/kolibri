<template>

  <core-base :topLevelPageName="topLevelPageName" :appBarTitle="$tr('coachTitle')">
    <div slot="app-bar-actions">
      <channel-switcher @switch="switchChannel"/>
    </div>

    <div v-if="isCoachAdminOrSuperuser" slot="content">
      <div v-if="notRootPage" class="page">
        <top-nav/>
      </div>
      <component class="page" :is="currentPage"/>
    </div>

    <div v-else slot="content" class="login-message">
      <h1>{{ $tr('logInPrompt') }}</h1>
      <p>{{ $tr('logInCommand') }}</p>
    </div>

  </core-base>

</template>


<script>

  const store = require('../state/store');
  const constants = require('../state/constants');
  const isCoachAdminOrSuperuser = require('kolibri.coreVue.vuex.getters').isCoachAdminOrSuperuser;
  const TopLevelPageNames = require('kolibri.coreVue.vuex.constants').TopLevelPageNames;

  module.exports = {
    $trNameSpace: 'coach-root',
    $trs: {
      coachTitle: 'Coach',
      logInPrompt: 'Did you forget to log in?',
      logInCommand: 'You must be logged in as an Admin to view this page.',
    },
    components: {
      'top-nav': require('./top-nav'),
      'class-list-page': require('./class-list-page'),
      'recent-page': require('./recent-page'),
      'topics-page': require('./topics-page'),
      'exams-page': require('./exams-page'),
      'learners-page': require('./learners-page'),
      'groups-page': require('./groups-page'),
      'core-base': require('kolibri.coreVue.components.coreBase'),
      'channel-switcher': require('kolibri.coreVue.components.channelSwitcher'),
      'coach-exercise-render-page': require('./coach-exercise-render-page'),
    },
    computed: {
      topLevelPageName: () => TopLevelPageNames.COACH,
      currentPage() {
        if (this.pageName === constants.PageNames.COACH_CLASS_LIST_PAGE) {
          return 'class-list-page';
        }
        if (this.pageName === constants.PageNames.COACH_RECENT_PAGE) {
          return 'recent-page';
        }
        if (this.pageName === constants.PageNames.COACH_TOPICS_PAGE) {
          return 'topics-page';
        }
        if (this.pageName === constants.PageNames.COACH_EXAMS_PAGE) {
          return 'exams-page';
        }
        if (this.pageName === constants.PageNames.COACH_LEARNERS_PAGE) {
          return 'learners-page';
        }
        if (this.pageName === constants.PageNames.COACH_GROUPS_PAGE) {
          return 'groups-page';
        }
        if (this.pageName === constants.PageNames.COACH_EXERCISE_RENDER_PAGE) {
          return 'coach-exercise-render-page';
        }
        return null;
      },
      notRootPage() {
        return this.pageName !== constants.PageNames.COACH_CLASS_LIST_PAGE;
      },
    },
    methods: {
      switchChannel(channelId) {
        this.$router.push({
          name: constants.PageNames.REPORTS_CHANNEL,
          params: {
            channel_id: channelId,
          },
        });
      },
    },
    vuex: {
      getters: {
        pageName: state => state.pageName,
        isCoachAdminOrSuperuser,
      },
    },
    store,
  };

</script>


<style lang="stylus" scoped>

  @require '~kolibri.styles.definitions'

  .login-message
    text-align: center
    margin-top: 200px

</style>
