import React, { useMemo, useState } from "react";

const BRAND_PRIMARY = "#7921c4";
const BRAND_ACCENT = "#b82598";

const getPillStyle = (value) => {
  const text = String(value).toLowerCase();

  if (
    text.includes("approved") ||
    text.includes("active") ||
    text.includes("available") ||
    text.includes("open") ||
    text.includes("on-duty")
  ) {
    return "bg-[#7921c4]/35 text-[#f7e8ff] border border-[#b82598]/70";
  }

  if (
    text.includes("pending") ||
    text.includes("hold") ||
    text.includes("review") ||
    text.includes("partial")
  ) {
    return "bg-[#b82598]/30 text-[#ffd8f4] border border-[#b82598]/80";
  }

  if (text.includes("high") || text.includes("urgent") || text.includes("blocked")) {
    return "bg-[#b82598]/45 text-white border border-[#b82598]";
  }

  return "bg-white/10 text-white border border-white/20";
};

const DashboardDataPage = ({
  title,
  subtitle,
  badge = "Dashboard",
  stats = [],
  columns = [],
  rows = [],
  emptyMessage = "No records found.",
  actionLabel = "+ Add Record",
}) => {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(columns[0]?.key || "");

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(q)
      )
    );

    if (!sortKey) return matched;

    return [...matched].sort((a, b) =>
      String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
  }, [rows, query, sortKey]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#b82598]/40 bg-[#0d0f26] p-5 shadow-[0_0_30px_rgba(121,33,196,0.22)]">
        <div className="text-center mb-6">
          <p className="inline-flex rounded-full border border-[#b82598] bg-[#7921c4]/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {badge}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#ff72c9]">{title}</h1>
          <p className="mt-1 text-white/90">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-[#b82598]/35 bg-gradient-to-r from-[#7921c4]/30 to-[#b82598]/30 p-4"
            >
              <p className="text-xs uppercase tracking-wider text-white/80">
                {item.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">{item.value}</p>
              <p className="mt-1 text-xs text-[#ffd8f4]">{item.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#7921c4]/50 bg-[#0c0f24] shadow-[0_0_35px_rgba(184,37,152,0.14)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-5 pt-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search here..."
            className="w-full lg:max-w-xl rounded-xl border border-[#7921c4] bg-[#7921c4]/75 px-4 py-2.5 text-white placeholder:text-[#e9c8ff] outline-none focus:border-[#b82598]"
          />

          <div className="flex items-center gap-3">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-xl border border-[#7921c4] bg-[#7921c4]/75 px-3 py-2.5 text-sm text-white outline-none focus:border-[#b82598]"
            >
              {columns.map((column) => (
                <option key={column.key} value={column.key}>
                  Sort by {column.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-[#b82598] to-[#7921c4] px-5 py-2.5 font-semibold text-white shadow-lg hover:opacity-90"
            >
              {actionLabel}
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto px-5 pb-5">
          <table className="min-w-full overflow-hidden rounded-xl text-sm">
            <thead className="bg-gradient-to-r from-[#b82598] to-[#7921c4] text-left text-white">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="whitespace-nowrap px-4 py-3 font-semibold"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr className="bg-[#2f1450]">
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-white/80"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className={`border-b border-[#7921c4]/60 ${
                      rowIndex % 2 === 0 ? "bg-[#3a1664]" : "bg-[#160a28]"
                    } hover:bg-[#5a1f8f]/70 transition-colors`}
                  >
                    {columns.map((column) => {
                      const cell = row[column.key];
                      const looksLikeState =
                        ["status", "priority", "availability", "tier", "onDuty"].includes(
                          column.key
                        ) || /active|pending|open|closed|review|partial/i.test(String(cell));

                      return (
                        <td
                          key={column.key}
                          className="whitespace-nowrap px-4 py-3 text-white"
                        >
                          {looksLikeState ? (
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getPillStyle(
                                cell
                              )}`}
                            >
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="mt-6 flex justify-center gap-3">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                type="button"
                className="h-10 w-10 rounded-full border border-[#b82598] text-white transition hover:scale-105"
                style={{
                  background:
                    page === 1
                      ? `linear-gradient(135deg, ${BRAND_ACCENT}, ${BRAND_PRIMARY})`
                      : "rgba(121, 33, 196, 0.45)",
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardDataPage;
