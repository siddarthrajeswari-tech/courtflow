import React from 'react'
import { History, Trash2, ChevronRight, Clock } from 'lucide-react'

export default function Stack({ items = [], onSelectItem, onClearStack, maxItems = 10 }) {
  if (!items || items.length === 0) {
    return (
      <div className="stack-history-container" style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
        <Clock size={16} style={{ marginBottom: '4px', opacity: 0.7 }} />
        <div>No recent search history in stack</div>
      </div>
    )
  }

  return (
    <div className="stack-history-container">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #e2e8f0',
          fontSize: '12px',
          fontWeight: 600,
          color: '#475569',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <History size={14} /> Search History Stack ({items.length})
        </span>
        {onClearStack && (
          <button
            type="button"
            className="stack-action-btn clear"
            onClick={onClearStack}
            title="Clear stack history"
          >
            <Trash2 size={12} /> Clear
          </button>
        )}
      </div>

      <div className="stack-items-list">
        {items.slice(0, maxItems).map((item, idx) => (
          <div
            key={item.id || item.cnr || idx}
            className="stack-history-item"
            onClick={() => onSelectItem && onSelectItem(item)}
            title={`Inspect ${item.title || item.cnr}`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="stack-badge">{item.cnr || `Case #${idx + 1}`}</span>
                {item.category && <span style={{ fontSize: '11px', color: '#64748b' }}>{item.category}</span>}
              </div>
              <span
                style={{
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '220px',
                }}
              >
                {item.title || item.label || 'Search query'}
              </span>
            </div>
            <ChevronRight size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
