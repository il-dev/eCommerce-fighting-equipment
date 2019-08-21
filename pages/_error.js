import * as Sentry from "@sentry/browser";
import getConfig from "next/config";
import React from "react";

// const { SENTRY_DSN } = getConfig().publicRuntimeConfig;

Sentry.init({
  dsn: "https://69e44d25df3f4abf8f5871a1b96998f1@sentry.io/1426120",
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        lang: "ru",
        labelName: "Имя",
        title: "Похоже обнаружена проблема!",
        subtitle: "Наша команда оповещена",
        subtitle2:
          "Если Вы хотите помочь, напишите, пожалуйста, что случилось.",
        labelComments: "Что случилось?",
        labelClose: "Закрыть",
        labelSubmit: "Отправить отчет об ошибке",
        successMessage: "Спасибо, Ваше сообщение отправлено."
      });
    }
    return event;
  }
});

/**
 * Send an error event to Sentry.
 *
 * Server-side:
 * Next.js captures SSR errors and never passes them to the Sentry
 * middleware. It does, however, render the _error.js component, so
 * we can manually fire Sentry events here.
 *
 * Client-side:
 * Unhandled client exceptions will always bubble up to the _error.js
 * component, so we can manually fire events here.
 */
const notfoundIdStyle = { position: "relative", height: "100vh" };
const notfoundClassStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  MsTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  maxWidth: "767px",
  width: "100%",
  lineHeight: "1.4",
  padding: "0px 15px",
  textAlign: "center"
};
const notfoundFourAndFour = {
  position: "relative",
  height: "150px",
  lineHeight: "150px",
  marginBottom: "25px"
};
const notfoundH1 = {
  fontFamily: "'CoreSansA55Medium', sans-serif",
  fontSize: "186px",
  fontWeight: "900",
  margin: "0px",
  textTransform: "uppercase",
  background: "url('/static/img/text.png')",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundSize: "cover",
  backgroundPosition: "center"
};
const notfoundH2 = {
  fontFamily: "'CoreSansA55Medium', sans-serif",
  fontSize: "26px",
  fontWeight: "700",
  margin: "0"
};
const notfoundP = {
  fontFamily: "'CoreSansA55Medium', sans-serif",
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "0px",
  textTransform: "uppercase"
};
const notfoundA = {
  fontFamily: "'CoreSansA55Medium', sans-serif",
  display: "inline-block",
  textTransform: "uppercase",
  color: "#fff",
  textDecoration: "none",
  border: "none",
  background: "#5c91fe",
  padding: "10px 40px",
  fontSize: "14px",
  fontWeight: "700",
  borderRadius: "1px",
  marginTop: "15px",
  WebkitTransition: "0.2s all",
  transition: "0.2s all"
};

const notifySentry = (err, req, statusCode) => {
  Sentry.configureScope(scope => {
    if (!req) {
      scope.setTag(`ssr`, false);
    } else {
      scope.setTag(`ssr`, true);
      scope.setExtra(`url`, req.url);
      scope.setExtra(`params`, req.params);
      scope.setExtra(`query`, req.query);
      scope.setExtra(`statusCode`, statusCode);
      scope.setExtra(`headers`, req.headers);

      if (req.user) {
        scope.setUser({ id: req.user.id, email: req.user.email });
      }
    }
  });

  Sentry.captureException(err);
};

export default class Error extends React.Component {
  static async getInitialProps({ req, res, err }) {
    let statusCode;

    if (res) {
      ({ statusCode } = res);
    } else if (err) {
      ({ statusCode } = err);
    } else {
      statusCode = null;
    }

    notifySentry(err, req, statusCode);

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div id="notfound" style={notfoundIdStyle}>
        <div className="notfound" style={notfoundClassStyle}>
          <div className="notfound-404" style={notfoundFourAndFour}>
            <h1 style={notfoundH1}>{statusCode}</h1>
          </div>
          <h2 style={notfoundH2}>Oops! Такая страница не найдена</h2>
          <p style={notfoundP}>
            Извините, похоже на то, что искомая страница не найдена, перемещена
            или временно недоступан.
          </p>
          <a style={notfoundA} href="/">
            Вернуться на главную
          </a>
        </div>
      </div>
    );
    // return <h1>{statusCode}</h1>;
  }
}
